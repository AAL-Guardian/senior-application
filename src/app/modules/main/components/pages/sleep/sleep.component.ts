import { Component, OnInit } from '@angular/core';
import { MqttService } from '../../../../../services/mqtt.service';

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.scss']
})
export class SleepComponent {

  constructor(
    private mqttService: MqttService
  ) { }

  awake() {
    this.mqttService.sendSystemStatus('awake');
  }
}
