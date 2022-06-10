import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime } from 'rxjs/operators';
import { Robot } from 'src/app/models/robot.model';
import { InstallationService } from 'src/app/services/installation.service';
import { MqttService } from 'src/app/services/mqtt.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrls: ['./preferences.component.scss']
})
@UntilDestroy()
export class PreferencesComponent implements OnInit {

  robot: Robot;
  form = new FormGroup({
    volume: new FormControl(undefined),
    rate: new FormControl(2),
    gender: new FormControl('female')
  })
  
  get volumeControl() {
    return this.form.controls['volume'] as FormControl
  }
  
  get speedControl() {
    return this.form.controls['rate'] as FormControl
  }
  
  get genderControl() {
    return this.form.controls['gender'] as FormControl
  }

  testMessage: string;

  constructor(
    private router: Router,
    private settingsService: SettingsService,
    private mqttService: MqttService,
    private translateService: TranslateService,
    private installationService: InstallationService
  ) { }

  ngOnInit(): void {
    this.translateService.get("Volume.TestMessage", { clientName: this.installationService.getData()?.clientName }).subscribe(
      message => this.testMessage = message
    )
    this.form.disable();
    this.settingsService.getRobotSettings().subscribe(
      robot => {
        if (!robot.extra) robot.extra = { volume: 100 };
        if (typeof robot.extra === 'string') robot.extra = JSON.parse(robot.extra)
        this.robot = robot;
        this.form.patchValue(robot.extra)
        this.form.enable();

        this.form.valueChanges.pipe(
          untilDestroyed(this),
          debounceTime(300),
        ).subscribe(
          val => {
            this.robot.extra = {
              ...this.robot.extra,
              ...val
            };
            this.settingsService.setRobotSettings(this.robot).subscribe();
          }
        );
      }
    )
  }

  sendAudio() {
    this.mqttService.showMessage(this.testMessage);
  }

  back() {
    this.router.navigateByUrl('/');
  }
}
