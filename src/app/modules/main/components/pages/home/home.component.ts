import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { ReportRequest } from 'src/app/models/report-request.model';
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
    protected installationService: InstallationService,
    protected translationSevice: TranslateService
  ) { }

  ngOnInit(): void {
    forkJoin([
      this.translationSevice.get('Home.ChangeVolume'),
      this.translationSevice.get('Home.SeeAppointments'),
      this.reportService.listReportTypes()
    ]).subscribe(
      ([volumeMessage, appointmentsMessage, list]) => this.list = [
        ...list
        .filter(one => one.id !== 3)
        .map(
          one => ({
            ...one,
            selected: false,
            type: "report" as ButtonType
          })
        ),
        {
          selected: false,
          description: volumeMessage,
          type: "link",
          href: '/volume'
        },
        {
          selected: false,
          description: appointmentsMessage,
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
