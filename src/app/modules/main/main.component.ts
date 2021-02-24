import { Component, HostListener, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor() {  }

  ngOnInit(): void {
    this.setTimeout();
    this.userInactive.subscribe(() => console.log('user has been inactive for 3s'));
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3000);
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

}
