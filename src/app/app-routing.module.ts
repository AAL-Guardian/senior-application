import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { InstallationComponent } from './components/pages/installation/installation.component';
import { LogoutComponent } from './components/pages/logout/logout.component';
import { InstalledGuard } from './guards/installed.guard';
import { NotInstalledGuard } from './guards/not-installed.guard';

const routes: Routes = [
  {
    path: 'installation',
    component: InstallationComponent,
    data: {
      title: 'Installation'
    },
    canActivate: [ NotInstalledGuard ]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout'
    },
    canActivate: [ InstalledGuard ]
  },
  {
    path: '',
    component: HomeComponent,
    data: {
      title: 'Home'
    },
    canActivate: [ InstalledGuard ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
