import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
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
  exitTimer: Date;

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
