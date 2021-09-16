import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { interval } from 'rxjs';
import { InstallationService } from 'src/app/services/installation.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
@UntilDestroy()
export class HeaderComponent implements OnInit {

  exitTimer: Date;
  date: Date;
  @Input()
  hideBack = false;

  @Output()
  back = new EventEmitter<void>();

  constructor(
    private installationService: InstallationService
  ) { }

  ngOnInit(): void {
    interval(1000).pipe(
      untilDestroyed(this)
    ).subscribe(
      () => this.date = new Date()
    )
  }

  mousedown() {
    this.exitTimer = new Date;
  }

  mouseup() {
    if( ( (new Date).getTime() - this.exitTimer.getTime() ) < 1000 * 10 ) {
      alert('ok');
      // this.installationService.uninstall();
    }
  }
}
