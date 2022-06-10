import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutModule } from '../layout/layout.module';
import { AppointmentsComponent } from './components/pages/appointments/appointments.component';
import { HomeComponent } from './components/pages/home/home.component';
import { PreferencesComponent } from './components/pages/preferences/preferences.component';
import { ReportPageComponent } from './components/pages/report-page/report-page.component';
import { SleepComponent } from './components/pages/sleep/sleep.component';
import { VolumeSettingComponent } from './components/pages/volume-setting/volume-setting.component';
import { WellbeingComponent } from './components/pages/wellbeing/wellbeing.component';
import { MainComponent } from './main.component';

const routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }, {
        path: 'report',
        component: ReportPageComponent
      }, {
        path: 'wellbeing',
        component: WellbeingComponent
      }, {
        path: 'volume',
        component: VolumeSettingComponent
      }, {
        path: 'appointments',
        component: AppointmentsComponent
      }, {
        path: 'preferences',
        component: PreferencesComponent
      }
    ]
  },
  {
    path: 'sleep',
    component: SleepComponent,
  }

]


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    WellbeingComponent,
    ReportPageComponent,
    VolumeSettingComponent,
    AppointmentsComponent,
    SleepComponent,
    PreferencesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    TranslateModule,
    RouterModule.forChild(routes)
  ],
})
export class MainModule { }
