import { Injectable } from '@angular/core';
import { IMqttClient, IMqttServiceOptions, MqttConnectionState, MqttService as RawService } from 'ngx-mqtt'
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class MqttService {

  constructor(
    private rawService: RawService
  ) { }

  connect() {
    this.rawService.connect({
      host: 'a3gfnasqfyjfxz-ats.iot.eu-west-1.amazonaws.com',
      protocol: 'wss',
      path: '/mqtt?x-amz-customauthorizer-name=GuardianAuthorizer',
      hostname: 'a3gfnasqfyjfxz-ats.iot.eu-west-1.amazonaws.com',
      clientId: 'test' + Math.random().toString(16).substr(2, 8),
      reconnectPeriod: 0,
      transformWsUrl(url: string, options: IMqttServiceOptions, client: IMqttClient) {
        options.username = 'ciao';
        return url;
      }
    });
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

  listen() {
    this.rawService.observe('test2created/#').subscribe(
      res => console.log(res),
      err => console.error(err)
    )
  }

  getShadow() {
    this.rawService.publish('$aws/things/test2created/shadow/get', '').subscribe();
  }

  listenShadow() {
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

  send() {
    this.rawService.publish('test2created', 'test', {
      // retain: true
    }).subscribe(
      res => console.log(res),
      err => console.error(err)
    );
  }
}
