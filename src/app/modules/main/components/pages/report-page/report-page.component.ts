import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ReportQuestionOption } from 'src/app/models/report-question-option.model';
import { ReportQuestion } from 'src/app/models/report-question.model';
import { ReportType } from 'src/app/models/report-type.model';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit {

  reportSetup: ReportType;

  currentQuestion: ReportQuestion;
  pastQuestions = [];
  confirmation: string;
  confirmationMessage: string;

  selected: ReportQuestionOption[];

  constructor(
    private reportService: ReportService,
    private router: Router,
    private translateService: TranslateService
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
    )
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
    this.selected = this.currentQuestion.options.filter(one => one.selected);
    this.reportService.changeQuestion(question);
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
      this.reportService.showMessage(this.confirmationMessage);
    }
  }

  end() {
    this.reportService.sendAnswers(this.reportSetup, this.reportService.currentReport);
    this.router.navigate(['/']);
  }
}
