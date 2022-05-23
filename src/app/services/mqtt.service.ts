import { Injectable } from '@angular/core';
import { IMqttClient, IMqttMessage, IMqttServiceOptions, MqttConnectionState, MqttService as RawService } from 'ngx-mqtt';
import { Observable, Subscription } from 'rxjs';
import { map, startWith, tap, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Question } from '../models/question.model';
import { InstallationService } from './installation.service';

@Injectable({
  providedIn: 'root'
})
export class MqttService {

  connecting = false;

  constructor(
    private rawService: RawService,
    private installationService: InstallationService,
  ) {
    let messageSubscription: Subscription;
    const onConnect = this.rawService.onConnect.subscribe(
      () => {
        this.connecting = true;
        this.sendStatus('connecting');
        if (!environment.production) {
          if(!messageSubscription) {
            messageSubscription = this.message().subscribe(log => console.log(log));
          }
          
        }
      }
    );
    const onDisconnect = this.rawService.onEnd.subscribe(
      (reason) => {
        this.connecting = false;
        messageSubscription.unsubscribe();
        messageSubscription = undefined;
      }
    );
    const onError = this.rawService.onError.subscribe(
      (err) => {
        console.error(err);
      }
    )
  }

  connect() {
    if (!this.connecting) {
      const data = this.installationService.getData();
      this.rawService.connect({
        protocol: 'wss',
        path: '/mqtt?x-amz-customauthorizer-name=' + data.authorizer,
        hostname: data.endpoint,
        protocolVersion: 4,
        clientId: data.clientId,
        reconnectPeriod: 1000 * 20,
        will: {
          retain: true,
          topic: `${this.robotTopic}/senior-app/status`,
          qos: 0,
          payload: JSON.stringify({
            status: 'disconnecting'
          })
        },
        transformWsUrl(url: string, options: IMqttServiceOptions, client: IMqttClient) {
          options.username = data.token;
          return url;
        }
      });
      this.connecting = true;
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

  listenStatus() {
    return this. listen('status').pipe(
      map(res => JSON.parse(res.payload.toString()) as { alive?: boolean }),
      startWith({ alive: undefined }),
      map(res => res.alive)
    )
  }

  message() {
    return this.rawService.messages.pipe(
      map((value: IMqttMessage, index) => {
        return value.topic + '-' + index.toFixed() + ':' + value.payload.toString()
      }),
      share()
    );
  }

  private get robotTopic() {
    const { robotTopic } = this.installationService.getData();
    return robotTopic;
  }

  listen(topic: string) {
    this.connect();
    return this.rawService.observe(`${this.robotTopic}/${topic}`)
  }

  send(topic: string, data?: any) {
    this.connect();
    this.rawService.publish(`${this.robotTopic}/${topic}`, JSON.stringify(data)).subscribe({
      next: () => null,
      error: err => { console.error(err) },
    });
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

  sendStatus(status: string) {
    this.connect();
    this.rawService.publish(`${this.robotTopic}/senior-app/status`, JSON.stringify({
      status
    }), {
      retain: true
    }).subscribe({
      next: () => null,
      error: err => { console.error(err) },
    });
  }

  showMessage(text: string) {
    this.sendEvent('showing_message', { text });
  }
}
