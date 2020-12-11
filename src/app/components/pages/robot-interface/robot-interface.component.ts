import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MqttService } from 'src/app/services/mqtt.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { map, switchMap } from 'rxjs/operators';
import { SpeakerService } from 'src/app/services/speaker.service';
import { Observable, Subscription, timer } from 'rxjs';
import { MqttConnectionState } from 'ngx-mqtt';
import { Question } from 'src/app/models/question.model';
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
          this.answerSub = this.mqtt.listenAnswers().subscribe(
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
    timer(30 * 1000).subscribe(
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
