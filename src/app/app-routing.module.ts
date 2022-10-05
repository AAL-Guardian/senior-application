import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { InstalledGuard } from './guards/installed.guard';
import { NotInstalledGuard } from './guards/not-installed.guard';

const routes: Routes = [
  {
    path: 'installation',
    loadChildren: () => import('./modules/installation/installation.module').then(mod => mod.InstallationModule),
    canActivate: [
      NotInstalledGuard
    ]
  },
  {
    path: '',
    loadChildren: () => import('./modules/main/main.module').then(mod => mod.MainModule),
    canActivate: [
      InstalledGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: environment.production
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
