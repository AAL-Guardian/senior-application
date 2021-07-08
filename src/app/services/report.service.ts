import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription, timer } from 'rxjs';
import { map, tap, timeout } from 'rxjs/operators';
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
    this.mqttService.connect();
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
    if(this.reportTimeout) {
      this.reportTimeout.unsubscribe();
    }
    this.reportTimeout = timer(60 * 1000 * 3).subscribe(
      end => {
        this.currentReport = undefined;
        this.router.navigateByUrl('/')
      }
    )
    this.router.navigateByUrl('report');
  }

  markShownCurrent() {
    this.sendEvent('showing_report', this.currentReport)
  }

  getReportSetup(reportTypeId: string) {
    return this.http.get<ReportType>(`${environment.apiEndpoint}/report/` + reportTypeId)
  }

  showMessage(text: string) {
    this.sendEvent('showing_message',  { text });
  }

  changeQuestion(reportQuestion: ReportQuestion) {
    this.sendEvent('showing_question', reportQuestion);
  }

  sendEvent(type: string, data: any) {
    this.mqttService.send(`senior-app/events/${type}`, data);
  }

  sendAnswers(reportSetup: ReportType, reportRequest?: ReportRequest) {
    if(this.reportTimeout) {
      this.reportTimeout.unsubscribe()
      this.currentReport = undefined;
    }
    this.mqttService.send('senior-app/answer', {
      reportSetup,
      reportRequest
    });
  }
}
