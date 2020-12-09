import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MqttService } from 'src/app/services/mqtt.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { map, switchMap } from 'rxjs/operators';
import { SpeakerService } from 'src/app/services/speaker.service';
import { Observable, Subscription, timer } from 'rxjs';
import { MqttConnectionState } from 'ngx-mqtt';
@Component({
  selector: 'app-robot-interface',
  templateUrl: './robot-interface.component.html',
  styleUrls: ['./robot-interface.component.scss']
})
@UntilDestroy()
export class RobotInterfaceComponent implements OnInit {

  audioUrl: string;
  question: string;

  constructor(
    private mqtt: MqttService,
    private speakerService: SpeakerService
  ) { }

  ngOnInit(): void {
    this.mqtt.listenQuestions()
      .pipe(
        untilDestroyed(this),
        switchMap(question => this.speakerService.getAudioUrl(question.question, question.language).pipe(
          map(audioUrl => ({
            audioUrl,
            question: question.question
          }))
        ))
      ).subscribe(
        res => {
          this.audioUrl = res.audioUrl;
          this.question = res.question;
          const answerSub = this.mqtt.listenAnswers().subscribe(
            answer => {
              answerSub.unsubscribe();
              this.speakerService.getAudioUrl('Thank You for answering', 'en').subscribe(
                audio => {
                  this.audioUrl = audio;
                }
              );
              this.question = undefined;
            }
          );
          timer(30 * 1000).subscribe(
            () => {
              answerSub.unsubscribe();
              this.speakerService.getAudioUrl("Seems like you don't want to answer", 'en').subscribe(
                audio => {
                  this.audioUrl = audio;
                }
              );
              this.question = undefined;
            }
          )
        }
      )
  }
}
