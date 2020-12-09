import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MqttService } from 'src/app/services/mqtt.service';

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
    private mqtt: MqttService
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
    this.mqtt.sendQuestion(this.questionForm.value)
    this.questionForm.reset();
  }
}
