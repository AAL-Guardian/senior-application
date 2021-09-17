import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { debounceTime } from 'rxjs/operators';
import { Robot } from 'src/app/models/robot.model';
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
  
  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit(): void {
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
          debounceTime(400)
        ).subscribe(
          val => {
            this.robot.extra.volume = val;
            this.settingsService.setRobotSettings(this.robot).subscribe();
          }
        )
      }
    )
  }

  back() {
    this.router.navigateByUrl('/');
  }
}
