import { ApplicationRef, Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { first } from 'rxjs/operators';
import { add, addHours, differenceInMilliseconds, formatISO, isAfter, isSameDay, isToday, parse, parseISO, startOfDay } from 'date-fns';
import { format } from 'path';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Guardian Senior Application';
  constructor(
    private updates: SwUpdate,
    private appRef: ApplicationRef) {

  }
  ngOnInit() {
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    const everySixHours$ = interval(6 * 60 * 60 * 1000);
    const everySixHoursOnceAppIsStable$ = concat(appIsStable$, everySixHours$);

    everySixHoursOnceAppIsStable$.subscribe(() => this.updates.checkForUpdate());
    
    this.updates.available.subscribe(event => {
      this.updates.activateUpdate().then(() => document.location.reload());
      console.log('current version is', event.current);
      console.log('available version is', event.available);
    });
    this.updates.unrecoverable.subscribe(event => {
      console.log('unrecoverable', event);
      document.location.reload();
    })
    this.updates.activated.subscribe(event => {
      console.log('old version was', event.previous);
      console.log('new version is', event.current);
    });

    
    setInterval(() => {
      const lastReboot = localStorage.getItem('lastReboot');
      if(!lastReboot || !isSameDay(parseISO(lastReboot), new Date)) {
        localStorage.setItem('lastReboot', formatISO(new Date));
        window.location.reload();
      }
    }, 60 * 60 * 1000);
  }
}
