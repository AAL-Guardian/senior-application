import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LayoutModule } from '../layout/layout.module';
import { WellbeingComponent } from './components/pages/wellbeing/wellbeing.component';
import { MainComponent } from './main.component';
import { ReportPageComponent } from './components/pages/report-page/report-page.component';

const routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'report',
        component: ReportPageComponent
      },
      {
        path: 'wellbeing',
        component: WellbeingComponent
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
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
