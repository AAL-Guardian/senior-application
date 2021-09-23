import { Location } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {

  @Input()
  hideBack = false;
  @Input()
  hideHome = false;

  @Output()
  back = new EventEmitter<void>();

  constructor(private location: Location) { }

  backHandler() {
    this.back.emit();
  }
}
