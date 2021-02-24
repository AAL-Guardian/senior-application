import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wellbeing',
  templateUrl: './wellbeing.component.html',
  styleUrls: ['./wellbeing.component.scss']
})
export class WellbeingComponent implements OnInit {

  step = 0;
  selected = [];
  stepsActions = [
    [
      {
        text: 'Very Bad',
        icon: '/assets/img/wellbeing/very-bad.svg'
      },
      {
        text: 'Fairly Bad',
        icon: '/assets/img/wellbeing/fairly-bad.svg'
      },
      {
        text: 'Fairly Good',
        icon: '/assets/img/wellbeing/fairly-good.svg'
      },
      {
        text: 'Very Good',
        icon: '/assets/img/wellbeing/very-good.svg'
      },
    ],
    [
      {
        text: 'Pain',
      },
      {
        text: 'Headache',
      },
      {
        text: 'Nauseous',
      },
      {
        text: 'Loneliness',
      },
      {
        text: 'Worry',
      },
      {
        text: 'Boredom',
      },
      {
        text: 'Tension',
      },
      {
        text: 'Other',
      },
    ]
  ] as {
    text: string;
    selected?: boolean;
    icon?: string;
  }[][];

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  changed(index: number, list: any[]) {
    if (list[index].selected) {
      list.filter((one, i) => i !== index).forEach(one => one.selected = false)
    }
  }

  forward(step) {
    this.selected[step] = this.stepsActions[step].filter(one => one.selected);
    this.step++;
  }

  back() {
    if (this.step === 0) {
      this.router.navigate(['/']);
    } else if (this.step === 2) {
      this.router.navigate(['/']);
    } else {
      this.step = this.step - 1;
    }
  }

}
