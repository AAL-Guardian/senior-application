import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription, timer } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { MqttService } from 'src/app/services/mqtt.service';

@Component({
  selector: 'app-senior-screen',
  templateUrl: './senior-screen.component.html',
  styleUrls: ['./senior-screen.component.scss']
})
@UntilDestroy()
export class SeniorScreenComponent implements OnInit {
  img = "";
  imgs = [
    "/assets/img/wallpapers/wp4690410-naturalistic-wallpapers.jpg",
    "/assets/img/wallpapers/wp4690411-naturalistic-wallpapers.jpg",
    "/assets/img/wallpapers/wp4690412-naturalistic-wallpapers.jpg",
    "/assets/img/wallpapers/wp4690413-naturalistic-wallpapers.jpg",
  ];
  thankyou = false;
  question: Question;
  timer: Subscription;
  constructor(
    private mqtt: MqttService,
  ) { }

  ngOnInit(): void {
    timer(0, 30 * 1000).pipe(untilDestroyed(this)).subscribe(
      () => this.img = this.imgs[Math.floor(Math.random() * this.imgs.length)]
    )

    this.mqtt.listenQuestions().pipe(
      untilDestroyed(this),
    ).subscribe(
      question =>  {
        this.thankyou = false;
        this.question = question;
        this.timer = timer(60 * 1000 * 5).subscribe(
          () => this.question = undefined
        )
      }
    )
  }

  sendAnswer(answer: string) {
    this.mqtt.sendAnswer(answer);
    if(this.timer) {
      this.timer.unsubscribe();
    }
    this.question = undefined;
    this.thankyou = true;
    timer(1000 * 10).subscribe(
      () => this.thankyou = false
    )
  }

}
