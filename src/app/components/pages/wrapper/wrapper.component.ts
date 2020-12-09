import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MqttService } from 'src/app/services/mqtt.service';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  status: Observable<string>;

  constructor(
    private mqtt: MqttService
  ) { }

  ngOnInit(): void {
    this.status = this.mqtt.status();
    this.mqtt.connect();
  }

}
