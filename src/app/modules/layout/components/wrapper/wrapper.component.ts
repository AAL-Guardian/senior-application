import { Location } from '@angular/common';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent implements OnInit {

  @Input()
  hideBack = false;

  @Input()
  back: Function = () => {
    this.location.back();
  }

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

}
