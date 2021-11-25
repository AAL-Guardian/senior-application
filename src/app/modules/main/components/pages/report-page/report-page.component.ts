import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { ReportQuestionOption } from 'src/app/models/report-question-option.model';
import { ReportQuestion } from 'src/app/models/report-question.model';
import { ReportType } from 'src/app/models/report-type.model';
import { InstallationService } from 'src/app/services/installation.service';
import { MqttService } from 'src/app/services/mqtt.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
@UntilDestroy()
export class ReportPageComponent implements OnInit, OnDestroy {

  reportSetup: ReportType;

  currentQuestion: ReportQuestion;
  pastQuestions = [];
  confirmation: string;
  confirmationMessage: string;

  selected: ReportQuestionOption[];

  constructor(
    private reportService: ReportService,
    private mqttService: MqttService,
    private router: Router,
    private translateService: TranslateService,
    private installationService: InstallationService
  ) { }

  ngOnInit(): void {
    if (!this.reportService.currentReport) {
      this.router.navigateByUrl('/');
    }
    this.translateService.get('Question.Confirmation').subscribe(
      tr => this.confirmationMessage = tr
    )
    this.reportService.getReportSetup(this.reportService.currentReport.report_type_id.toFixed()).subscribe(
      res => {
        this.reportSetup = res;
        this.reportService.markShownCurrent();
        this.changeCurrentQuestion(this.reportSetup.start_question);
      }
    );
    this.reportService.listenYesNoAnswers().pipe(
      untilDestroyed(this)
    ).subscribe(res => {
      if (this.selected.length === 0) {
        const question = this.currentQuestion.options.find(one => (one.is_yes_no === 1) === res.data.answer)
        question.selected = true;
        this.next();
      }
    });
  }

  changed(index: number) {
    this.reportService.cancelTimer();
    if (!this.currentQuestion?.multiple_answers && this.currentQuestion?.options[index].selected) {
      this.currentQuestion?.options.filter((one, i) => i !== index).forEach(one => one.selected = false)
    }
    this.selected = this.currentQuestion.options.filter(one => one.selected);
  }

  changeCurrentQuestion(question: ReportQuestion) {
    this.currentQuestion = question;

    this.currentQuestion.description = this.currentQuestion.description.replace('{{ description }}', this.reportService.currentReport?.description || '')
    this.currentQuestion.description = this.currentQuestion.description.replace('{{ clientName }}', this.installationService.getData()?.clientName)

    this.selected = this.currentQuestion.options.filter(one => one.selected);
    this.reportService.changeQuestion(
      question,
      this.selected.length === 0 && this.currentQuestion.options.some(one => one.is_yes_no === null)
    );
  }

  back() {
    if (this.pastQuestions?.length === 0) {
      this.router.navigate(['/']);
      return;
    }
    this.confirmation = undefined;
    this.changeCurrentQuestion(this.pastQuestions.pop());
  }

  next() {
    this.pastQuestions.push(this.currentQuestion);
    const followedOption = this.currentQuestion.options.filter(one => one.selected && one.followup_question).pop();

    if (this.reportService.currentReport.show_followups && followedOption?.followup_question) {
      this.changeCurrentQuestion(followedOption?.followup_question);
    } else {
      this.currentQuestion = undefined;
      this.confirmation = this.confirmationMessage
      this.mqttService.showMessage(this.confirmationMessage);
    }
  }

  end() {
    this.router.navigate(['/']);
  }

  send() {
    this.translateService.get('Question.ThankYou').subscribe(
      message => {
        this.mqttService.showMessage(message);
        this.reportService.sendAnswers(this.reportSetup, this.reportService.currentReport);
        this.router.navigate(['/']);
      }
    )
  }

  ngOnDestroy() {
    this.reportService.endReport()
  }
}
