import { Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Subscription, timer } from 'rxjs';
import { Question } from 'src/app/models/question.model';
import { MqttService } from 'src/app/services/mqtt.service';
import { SpeakerService } from 'src/app/services/speaker.service';

@Component({
  selector: 'app-robot-interface',
  templateUrl: './robot-interface.component.html',
  styleUrls: ['./robot-interface.component.scss']
})
@UntilDestroy()
export class RobotInterfaceComponent implements OnInit {

  audioUrl: string;
  feedbackUrl: string;
  question: string;
  answerSub: Subscription;

  constructor(
    private mqtt: MqttService,
    private speakerService: SpeakerService
  ) { }

  ngOnInit(): void {
    this.mqtt.listenQuestions()
      .pipe(
        untilDestroyed(this),
        // switchMap(question => this.speakerService.getAudioUrl(question.question, question.language).pipe(
        //   map(audioUrl => ({
        //     audioUrl,
        //     question: question.question
        //   }))
        // ))
      ).subscribe(
        (question: Question)  => {
          this.audioUrl = question.audioUrl;
          this.question = question.question;
          this.answerSub = this.mqtt.listenAnswers().pipe(untilDestroyed(this)).subscribe(
            answer => {
              this.answerSub.unsubscribe();
              this.speakerService.getAudioUrl('Thank You for answering', 'en').subscribe(
                audio => {
                  this.feedbackUrl = audio;
                }
              );
              this.question = undefined;
            }
          );
          
        }
      )
  }

  ended() {
    this.audioUrl = null;
    timer(20 * 1000).pipe(untilDestroyed(this)).subscribe(
      () => {
        this.answerSub.unsubscribe();
        this.speakerService.getAudioUrl("Seems like you don't want to answer", 'en').subscribe(
          audio => {
            this.feedbackUrl = audio;
          }
        );
        this.question = undefined;
      }
    )
  }
}
