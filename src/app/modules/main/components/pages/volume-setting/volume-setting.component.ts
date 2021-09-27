import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { debounceTime, distinct, distinctUntilChanged, tap } from 'rxjs/operators';
import { Robot } from 'src/app/models/robot.model';
import { InstallationService } from 'src/app/services/installation.service';
import { MqttService } from 'src/app/services/mqtt.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-volume-setting',
  templateUrl: './volume-setting.component.html',
  styleUrls: ['./volume-setting.component.scss']
})
@UntilDestroy()
export class VolumeSettingComponent implements OnInit {

  robot: Robot;
  volumeControl = new FormControl(undefined);
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
    this.volumeControl.disable();
    this.settingsService.getRobotSettings().subscribe(
      robot => {
        if(!robot.extra) robot.extra = { volume: 100 };
        if(typeof robot.extra === 'string') robot.extra = JSON.parse(robot.extra)
        this.robot = robot;
        this.volumeControl.patchValue(robot.extra.volume)
        this.volumeControl.enable();

        this.volumeControl.valueChanges.pipe(
          untilDestroyed(this),
          debounceTime(300),
        ).subscribe(
          val => {
            this.robot.extra.volume = val;
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
