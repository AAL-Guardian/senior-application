import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-selectable-button',
  templateUrl: './selectable-button.component.html',
  styleUrls: ['./selectable-button.component.scss']
})
export class SelectableButtonComponent implements OnInit {

  @Input()
  selected: boolean;
  
  @Output()
  selectedChange = new EventEmitter<boolean>();

  @Input()
  text: string;

  @Input()
  icon: string;

  @Input()
  color: string;

  constructor() { }

  ngOnInit(): void {
  }

}
