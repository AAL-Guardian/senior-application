import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ReportQuestion } from '../models/report-question.model';
import { ReportRequest } from '../models/report-request.model';
import { ReportType } from '../models/report-type.model';
import { MqttService } from './mqtt.service';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
  
  currentReport: ReportRequest;
  reportTimeout: Subscription;

  constructor(
    private http: HttpClient,
    private router: Router,
    private mqttService: MqttService,
  ) { }

  listenReportRequests() {
    return this.mqttService.listen(`senior-app/report-request`).pipe(
      map(res => JSON.parse(res.payload.toString()) as ReportRequest),
      tap(res => console.log(res)),
      tap(res => this.start(res))
    )
  }

  listReportTypes() {
    return this.http.get<ReportType[]>(`${environment.apiEndpoint}/report/list`)
  }

  start(report_request: ReportRequest) {
    this.currentReport = report_request;
    this.cancelTimer();
    this.reportTimeout = timer(60 * 1000 * 3).subscribe(
      end => {
        this.currentReport = undefined;
        this.router.navigateByUrl('/')
      }
    )
    this.router.navigateByUrl('report');
  }

  markShownCurrent() {
    this.mqttService.sendEvent('showing_report', this.currentReport)
  }

  getReportSetup(reportTypeId: string) {
    return this.http.get<ReportType>(`${environment.apiEndpoint}/report/` + reportTypeId)
  }

  changeQuestion(reportQuestion: ReportQuestion) {
    this.mqttService.sendEvent('showing_question', reportQuestion);
  }

  cancelTimer() {
    if(this.reportTimeout) {
      this.reportTimeout.unsubscribe();
      this.reportTimeout = undefined;
    }
  }

  endReport() {
    this.cancelTimer();
    this.currentReport = undefined;
  }

  sendAnswers(reportSetup: ReportType, reportRequest?: ReportRequest) {
    this.mqttService.send('senior-app/answer', {
      reportSetup,
      reportRequest
    });
    this.endReport();
  }
}
