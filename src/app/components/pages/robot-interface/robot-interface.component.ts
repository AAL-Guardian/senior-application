import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MqttService } from 'src/app/services/mqtt.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy'
import { map, switchMap } from 'rxjs/operators';
import { SpeakerService } from 'src/app/services/speaker.service';
import { Observable, Subscription } from 'rxjs';
@Component({
  selector: 'app-robot-interface',
  templateUrl: './robot-interface.component.html',
  styleUrls: ['./robot-interface.component.scss']
})
@UntilDestroy()
export class RobotInterfaceComponent implements OnInit {

  sub: Subscription;
  audioUrl: string;
  question: string;

  constructor(
    private mqtt: MqttService,
    private speakerService: SpeakerService
  ) { }

  ngOnInit(): void {
    this.sub = this.mqtt.listenQuestions()
      .pipe(
        untilDestroyed(this),
        switchMap(question => this.speakerService.getAudioUrl(question.question).pipe(
          map(audioUrl => ({
            audioUrl,
            question: question.question
          }))
        ))
      ).subscribe(
        res => {
          this.audioUrl = res.audioUrl;
          this.question = res.question;
        }
      )
  }
}
