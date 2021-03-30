import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportRequest } from 'src/app/models/report-request.model';
import { ReportType } from 'src/app/models/report-type.model';
import { InstallationService } from 'src/app/services/installation.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list: ReportType[];
  selected: ReportType;
  clientName: string;

  constructor(
    protected router: Router,
    protected reportService: ReportService,
    protected installationService: InstallationService
  ) { }

  ngOnInit(): void {
    this.reportService.listReportTypes().subscribe(
      list => this.list = list
    );
    this.clientName = this.installationService.getData()?.clientName;
  }

  changed(index: number) {
    if (this.list[index].selected) {
      this.list.filter((one, i) => i !== index).forEach(one => one.selected = false)
    }
    this.selected = this.list.find(one => one.selected);
  }

  send() {
    this.reportService.start({ report_type_id: this.selected.id, show_followups: 1 } as ReportRequest)
  }
}
