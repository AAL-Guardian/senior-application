import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { map } from 'rxjs/operators';
import { Question } from 'src/app/models/question.model';
import { MqttService } from 'src/app/services/mqtt.service';
import { SpeakerService } from 'src/app/services/speaker.service';

@Component({
  selector: 'app-cloud-brain',
  templateUrl: './cloud-brain.component.html',
  styleUrls: ['./cloud-brain.component.scss']
})
@UntilDestroy()
export class CloudBrainComponent implements OnInit {

  messageHistory = [];

  questionForm = new FormGroup({
    question: new FormControl(),
    language: new FormControl('en'),
    answers: new FormArray([])
  });
  constructor(
    private mqtt: MqttService,
    private speakerService: SpeakerService
  ) { }

  ngOnInit(): void {
    this.mqtt.listenAll().pipe(untilDestroyed(this)).subscribe(
      message => this.messageHistory.push(message)
    );
  }

  get answers() {
    return this.questionForm.controls.answers as FormArray
  }

  addAnswer() {
    this.answers.push(
      new FormControl()
    )
  }

  send() {
    const question = this.questionForm.value as Question;
    
    this.speakerService.getAudioUrl(question.question, question.language).pipe(
      map(audioUrl => ({
        ...question,
        audioUrl
      })
    )).subscribe(
      question => {
        this.mqtt.sendQuestion(question);

        this.questionForm.controls.question.reset();
        this.questionForm.controls.answers = new FormArray([]);
      }
    )
  }
}
