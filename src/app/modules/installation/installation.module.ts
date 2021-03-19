import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstallationPageComponent } from './components/installation-page/installation-page.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const routes = [
  {
    path: '',
    component: InstallationPageComponent
  },
]

@NgModule({
  declarations: [
    InstallationPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class InstallationModule { }
