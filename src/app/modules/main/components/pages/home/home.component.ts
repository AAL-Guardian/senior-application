import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReportRequest } from 'src/app/models/report-request.model';
import { ReportType } from 'src/app/models/report-type.model';
import { InstallationService } from 'src/app/services/installation.service';
import { ReportService } from 'src/app/services/report.service';

type ButtonType = "link" | "report";
type ActionButton = {
  type: ButtonType,
  selected: boolean,
  description: string,
  [key: string]: unknown,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  list: ActionButton[];
  selected: ActionButton;
  clientName: string;
  get clientNameTr() {
    return { clientName: this.clientName }
  }

  constructor(
    protected router: Router,
    protected reportService: ReportService,
    protected installationService: InstallationService
  ) { }

  ngOnInit(): void {
    this.reportService.listReportTypes().subscribe(
      list => this.list = [
        ...list.map(
          one => ({
            ...one,
            selected: false,
            type: "report" as ButtonType
          })
        ),
        {
          selected: false,
          description: 'I want to change the volume of Misty',
          type: "link",
          href: '/volume'
        },
        {
          selected: false,
          description: 'I want to see my appointments of today',
          type: "link",
          href: "/appointments"
        }
      ]
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
    switch(this.selected.type) {
      case 'link':
        this.router.navigateByUrl(this.selected.href as string);
        break;
      case 'report':
        this.reportService.start({ report_type_id: this.selected.id, show_followups: 1 } as ReportRequest);
        break;
    }
    
  }
}
