import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  actions = [
    {
      text: "I want to report my medication intake",
    },
    {
      text: "I want to report my sleep quality",
    },
    {
      text: "I want to report my meal or drink intake",
    },
    {
      text: "I want to report my wellbeing",
      url: 'wellbeing'
    },
    {
      text: "I want to see my appointments of today",
    },
    {
      text: "I want to report my medication intake",
    },
    {
      text: "I want to change the volume of Misty",
    },
  ] as {
    text: string,
    selected?: boolean;
    url?: string;
  }[];

  constructor(
    protected router: Router
  ) { }

  ngOnInit(): void {
  }

  changed(index: number) {
    if (this.actions[index].selected) {
      this.actions.filter((one, i) => i !== index).forEach(one => one.selected = false)
    }
  }

  send() {
    const selected = this.actions.find(one => one.selected);
    if(selected && selected.url) {
      this.router.navigateByUrl(selected.url);
    }
  }
}
