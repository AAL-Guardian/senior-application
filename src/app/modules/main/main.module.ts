import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LayoutModule } from '../layout/layout.module';
import { WellbeingComponent } from './components/pages/wellbeing/wellbeing.component';
import { MainComponent } from './main.component';
import { ReportPageComponent } from './components/pages/report-page/report-page.component';
import { TranslateModule } from '@ngx-translate/core';
import { VolumeSettingComponent } from './components/pages/volume-setting/volume-setting.component';
import { AppointmentsComponent } from './components/pages/appointments/appointments.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/interceptors/auth.interceptor';

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
      }
    ]
  },

]


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    WellbeingComponent,
    ReportPageComponent,
    VolumeSettingComponent,
    AppointmentsComponent
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
