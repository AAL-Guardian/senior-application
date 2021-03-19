import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportRequest } from 'src/app/models/report-request.model';
import { ReportType } from 'src/app/models/report-type.model';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list: ReportType[];

  constructor(
    protected router: Router,
    protected reportService: ReportService
  ) { }

  ngOnInit(): void {
    this.reportService.listReportTypes().subscribe(
      list => this.list = list
    )
  }

  changed(index: number) {
    if (this.list[index].selected) {
      this.list.filter((one, i) => i !== index).forEach(one => one.selected = false)
    }
  }

  send() {
    const selected = this.list.find(one => one.selected);
    this.reportService.start({ report_type_id: selected.id } as ReportRequest)
  }
}
