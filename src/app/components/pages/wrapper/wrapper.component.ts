import { Component, OnInit } from '@angular/core';
import { MqttService } from 'src/app/services/mqtt.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  constructor(
    private mqtt: MqttService
  ) { }

  ngOnInit(): void {
    this.mqtt.connect();
  }

}
