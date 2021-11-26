import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent, merge, Observable, Subject, tap, throttleTime } from 'rxjs';
import { InstallationService } from 'src/app/services/installation.service';
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
  robotStatus: Observable<boolean | undefined>;
  exitTimer: Date;
  interactionSubject: Observable<Event>

  constructor(
    private mqttService: MqttService,
    private reportService: ReportService,
    private installationService: InstallationService,
    private router: Router,
    translateService: TranslateService,
  ) {
    translateService.use(this.installationService.getData().clientLang);
  }

  ngOnInit(): void {
    this.mqttStatus = this.mqttService.status();
    this.robotStatus = this.mqttService.listenStatus().pipe(
      untilDestroyed(this)
    );
    
    this.reportService.listenReportRequests().pipe(
      untilDestroyed(this)
    ).subscribe();
    
    this.monitorUserActivity();
  }

  monitorUserActivity() {
    this.setTimeout();
    this.userInactive.subscribe(() => console.log('user has been inactive for 3s'));

    merge(
      fromEvent(window, 'mousemove'),
      fromEvent(window, 'click'),
      fromEvent(window, 'tap'),
      fromEvent(window, 'scroll'),
    ).pipe(
      untilDestroyed(this),
      throttleTime(2000, undefined, { leading: true, trailing: true }),
    ).subscribe(evt => this.refreshUserState(evt));
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3000);
  }

  refreshUserState(event: Event) {
    this.mqttService.sendEvent('senior_interaction')
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

  mousedown() {
    this.exitTimer = new Date;
  }

  mouseup() {
    if( ( (new Date).getTime() - this.exitTimer.getTime() ) > 1000 * 5 ) {
      this.installationService.uninstall();
      this.router.navigateByUrl('/installation')
    }
    this.exitTimer = undefined;
  }
}
