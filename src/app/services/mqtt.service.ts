import { Injectable } from '@angular/core';
import { IMqttClient, IMqttServiceOptions, MqttConnectionState, MqttService as RawService } from 'ngx-mqtt'
import { map, tap } from 'rxjs/operators';
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
    private installationService: InstallationService
  ) {
    const onConnect = this.rawService.onConnect.subscribe(
      () => {
        this.connected = true;
        if (!environment.production) {
          this.message().subscribe(log => console.debug(log));
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
        host: data.endpoint,
        protocol: 'wss',
        path: '/mqtt?x-amz-customauthorizer-name=GuardianAuthorizer',
        hostname: data.endpoint,
        clientId: data.clientId,
        reconnectPeriod: 0,
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

  status() {
    return this.rawService.state.pipe(
      map(state => {
        switch (state) {
          case MqttConnectionState.CLOSED:
            return 'CLOSED';
          case MqttConnectionState.CONNECTING:
            return 'CONNECTING';
          case MqttConnectionState.CONNECTED:
            return 'CONNECTED';
        }
      })
    );
  }

  listenAll() {
    this.connect();
    const data = this.installationService.getData();
    return this.rawService.observe(`${data.robotTopic}/#`).pipe(
      map(message => ({
        topic: message.topic,
        message: message.payload.toString(),
        qos: message.qos,
        messageId: message.messageId
      }))
    )
  }

  listenQuestions() {
    this.connect();
    const data = this.installationService.getData();
    return this.rawService.observe(`${data.robotTopic}/question`).pipe(
      map(res => JSON.parse(res.payload.toString()) as Question),
      tap(res => console.log(res))
    )
  }

  getShadow() {
    this.connect();
    this.rawService.publish('$aws/things/test2created/shadow/get', '').subscribe();
  }

  listenShadow() {
    this.connect();
    this.rawService.observe('$aws/things/test2created/shadow').subscribe(
      res => console.log(res),
      err => console.error(err)
    )
  }

  message() {
    return this.rawService.messages.pipe(
      map((value, index) => {
        return value.topic + '-' + index.toFixed() + ':' + value.payload.toString()
      })
    );
  }

  send(topic: string, data: any) {
    this.connect();
    const { robotTopic } = this.installationService.getData();

    this.rawService.publish(`${robotTopic}/${topic}`, JSON.stringify(data)).subscribe(
      res => console.log(res),
      err => console.error(err)
    );
  }

  sendQuestion(data: Question) {
    return this.send('question', data);
  }
}
