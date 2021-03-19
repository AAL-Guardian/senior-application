import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(
    private reportService: ReportService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.reportService.currentReport) {
      this.router.navigateByUrl('/');
    }
    this.reportService.getReportSetup(this.reportService.currentReport.report_type_id.toFixed()).subscribe(
      res => {
        this.reportSetup = res;
        this.changeCurrentQuestion(this.reportSetup.start_question);
      }
    )
  }

  changeCurrentQuestion(question: ReportQuestion) {
    this.currentQuestion = question;
    this.reportService.changeQuestion(question);
  }

  back() {
    if (this.pastQuestions.length === 0) {
      this.end();
    }
    this.currentQuestion = this.pastQuestions[this.pastQuestions.length - 1];
  }

  next() {
    this.pastQuestions.push(this.currentQuestion);
    const followedOption = this.currentQuestion.options.filter(one => one.selected && one.followup_question).pop();

    if (followedOption?.followup_question) {
      this.changeCurrentQuestion(followedOption?.followup_question);
    } else {
      this.currentQuestion = undefined;
      this.confirmation = 'Do you want to send this report?'
      this.reportService.showMessage(this.confirmation);
    }
  }

  end() {
    this.reportService.sendAnswers(this.reportSetup);
    this.router.navigate(['/']);
  }
}
