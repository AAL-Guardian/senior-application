import { Component, OnInit } from '@angular/core';
import { MqttService } from '../../../../../services/mqtt.service';

@Component({
  selector: 'app-sleep',
  templateUrl: './sleep.component.html',
  styleUrls: ['./sleep.component.scss']
})
export class SleepComponent implements OnInit {

  constructor(
    private mqttService: MqttService
  ) { }

  ngOnInit(): void {
    this.mqttService.sendStatus('asleep')
  }

}
