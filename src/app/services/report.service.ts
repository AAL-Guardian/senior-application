import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ReportQuestionOption } from '../models/report-question-option.model';
import { ReportQuestion } from '../models/report-question.model';
import { ReportRequest } from '../models/report-request.model';
import { ReportType } from '../models/report-type.model';
import { MqttService } from './mqtt.service';


@Injectable({
  providedIn: 'root'
})
export class ReportService {
  
  currentReport: ReportRequest;

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
    this.router.navigateByUrl('report');
  }

  getReportSetup(reportTypeId: string) {
    return this.http.get<ReportType>(`${environment.apiEndpoint}/report/` + reportTypeId)
  }

  showMessage(text: string) {
    this.sendEvent('showing_message', { text });
  }

  changeQuestion(reportQuestion: ReportQuestion) {
    this.sendEvent('showing_question', { question: reportQuestion });
  }

  sendEvent(type: string, data: any) {
    this.mqttService.send('senior-app/events', {
      type,
      data
    })
  }

  sendAnswers(reportSetup: ReportType, reportRequest?: ReportRequest) {
    this.mqttService.send('senior-app/answer', {
      reportSetup,
      reportRequest
    });
  }
}
