import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { LayoutModule } from '../layout/layout.module';
import { WellbeingComponent } from './components/pages/wellbeing/wellbeing.component';
import { MainComponent } from './main.component';

const routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'wellbeing',
    component: WellbeingComponent
  }
]


@NgModule({
  bootstrap: [
    MainComponent
  ],
  declarations: [
    MainComponent,
    HomeComponent,
    WellbeingComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    LayoutModule,
    RouterModule.forChild(routes)
  ]
})
export class MainModule { }
