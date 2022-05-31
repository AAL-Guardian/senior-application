import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval } from 'rxjs';
import { MqttService } from '../../../../services/mqtt.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
@UntilDestroy()
export class HeaderComponent implements OnInit {

  date = new Date();
  @Input()
  hideBack = false;
  @Input()
  hideHome = false;

  @Output()
  back = new EventEmitter<void>();

  constructor(
    private router: Router,
    private mqttService: MqttService
  ) { }

  ngOnInit(): void {
    interval(1000).pipe(
      untilDestroyed(this)
    ).subscribe(
      () => this.date = new Date()
    )
  }

  sleep() {
    this.mqttService.sendSystemStatus('asleep');
  }

  home() {
    this.router.navigateByUrl('/');
  }
}
