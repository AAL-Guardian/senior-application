import { Component, OnInit } from '@angular/core';
import { MqttService } from 'src/app/services/mqtt.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private mqttService: MqttService
  ) { }

  ngOnInit(): void {
    this.mqttService.doThings();
  }

}
