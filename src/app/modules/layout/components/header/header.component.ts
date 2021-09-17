import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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

  date: Date;
  @Input()
  hideBack = false;

  @Output()
  back = new EventEmitter<void>();

  constructor(

  ) { }

  ngOnInit(): void {
    interval(1000).pipe(
      untilDestroyed(this)
    ).subscribe(
      () => this.date = new Date()
    )
  }
}
