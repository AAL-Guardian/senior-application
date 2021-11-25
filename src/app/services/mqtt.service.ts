import { Injectable } from '@angular/core';
import { IMqttClient, IMqttMessage, IMqttServiceOptions, MqttConnectionState, MqttService as RawService } from 'ngx-mqtt';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Question } from '../models/question.model';
import { InstallationService } from './installation.service';

@Injectable({
  providedIn: 'root'
})
export class MqttService {

  connected = false;

  constructor(
    private rawService: RawService,
    private installationService: InstallationService,
  ) {
    const onConnect = this.rawService.onConnect.subscribe(
      () => {
        this.connected = true;
        if (!environment.production) {
          this.message().subscribe(log => console.log(log));
        }
      }
    );
    const onDisconnect = this.rawService.onEnd.subscribe(
      () => this.connected = false
    );
  }

  connect() {
    if (!this.connected) {
      const data = this.installationService.getData();
      this.rawService.connect({
        protocol: 'wss',
        path: '/mqtt?x-amz-customauthorizer-name=GuardianAuthorizerDev',
        hostname: data.endpoint,
        clientId: data.clientId,
        reconnectPeriod: 1000 * 5,
        transformWsUrl(url: string, options: IMqttServiceOptions, client: IMqttClient) {
          options.username = data.token;
          return url;
        }
      });
    }
  }

  disconnect() {
    this.rawService.disconnect();
  }

  status(): Observable<string> {
    return this.rawService.state.pipe(
      map((state: MqttConnectionState) => {
        switch (state) {
          case MqttConnectionState.CLOSED:
            return 'CLOSED';
          case MqttConnectionState.CONNECTING:
            return 'CONNECTING';
          case MqttConnectionState.CONNECTED:
            return 'CONNECTED';
          // default:
          //   throw new Error('Unknown Status')
        }
      })
    );
  }

  listenAll() {
    return this.listen(`#`).pipe(
      map((message: IMqttMessage) => ({
        topic: message.topic,
        message: message.payload.toString(),
        qos: message.qos,
        messageId: message.messageId
      }))
    )
  }



  /**
   * @deprecated
   */
  listenQuestions() {
    return this.listen(`question`).pipe(
      map((res: IMqttMessage) => JSON.parse(res.payload.toString()) as Question),
      tap(res => console.log(res))
    )
  }

  /**
   * @deprecated
   */
  listenAnswers() {
    return this.listen('answer').pipe(
      map((res: IMqttMessage) => JSON.parse(res.payload.toString()) as string),
      tap(res => console.log(res))
    )
  }

  getShadow() {
    this.connect();
    const data = this.installationService.getData();
    this.rawService.publish(`$aws/things/${data.robotTopic}/shadow/get`, '').subscribe();
  }

  listenShadow() {
    this.connect();
    const data = this.installationService.getData();
    return this.rawService.observe(`$aws/things/${data.robotTopic}/shadow`)
  }

  listenStatus() {
    return this.listen('status').pipe(
      map(res => JSON.parse(res.payload.toString()) as { alive?: boolean }),
      startWith({ alive: undefined }),
      map(res => res.alive)
    )
  }

  message() {
    return this.rawService.messages.pipe(
      map((value: IMqttMessage, index) => {
        return value.topic + '-' + index.toFixed() + ':' + value.payload.toString()
      })
    );
  }

  listen(topic: string) {
    this.connect();
    const { robotTopic } = this.installationService.getData();
    return this.rawService.observe(`${robotTopic}/${topic}`)
  }

  send(topic: string, data?: any) {
    this.connect();
    const { robotTopic } = this.installationService.getData();

    this.rawService.publish(`${robotTopic}/${topic}`, JSON.stringify(data)).subscribe(
      null,
      err => { console.error(err) },
    );
  }

  sendQuestion(data: Question) {
    return this.send('question', data);
  }

  sendAnswer(text: string) {
    return this.send('answer', text);
  }

  sendEvent(type: string, data?: any) {
    this.send(`senior-app/events/${type}`, data);
  }

  showMessage(text: string) {
    this.sendEvent('showing_message', { text });
  }
}
