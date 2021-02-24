import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { IotService } from 'src/app/services/iot.service';
import { MqttService } from 'src/app/services/mqtt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  state: Observable<string>;
  message: Observable<string>;

  constructor(
    private mqttService: MqttService,
    // private iotService: IotService
  ) { }

  ngOnInit(): void {
    this.state = this.mqttService.status();
    this.message = this.mqttService.message();
  }

  connect() {
    this.mqttService.connect();
    // this.iotService.start2();
  }

  listen() {
    // this.mqttService.listen();
    this.mqttService.listenShadow();
  }

  getShadow() {
    this.mqttService.getShadow();
  }

}
