import { Component, HostListener, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { MqttService } from 'src/app/services/mqtt.service';
import { ReportService } from 'src/app/services/report.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
@UntilDestroy()
export class MainComponent implements OnInit {

  userActivity: any;
  userInactive: Subject<any> = new Subject();
  mqttStatus: Observable<string>;

  constructor(
    private mqttService: MqttService,
    private reportService: ReportService,
    translateService: TranslateService,
  ) {
    translateService.use('en');
  }

  ngOnInit(): void {
    this.mqttStatus = this.mqttService.status();
    this.setTimeout();
    this.userInactive.subscribe(() => console.log('user has been inactive for 3s'));
    this.mqttService.connect();
    this.reportService.listenReportRequests().pipe(
      untilDestroyed(this)
    ).subscribe();
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

}
