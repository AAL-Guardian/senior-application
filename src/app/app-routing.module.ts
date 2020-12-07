import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CloudBrainComponent } from './components/pages/cloud-brain/cloud-brain.component';
import { HomeComponent } from './components/pages/home/home.component';
import { InstallationComponent } from './components/pages/installation/installation.component';
import { LogoutComponent } from './components/pages/logout/logout.component';
import { RobotInterfaceComponent } from './components/pages/robot-interface/robot-interface.component';
import { SeniorScreenComponent } from './components/pages/senior-screen/senior-screen.component';
import { WrapperComponent } from './components/pages/wrapper/wrapper.component';
import { InstalledGuard } from './guards/installed.guard';
import { NotInstalledGuard } from './guards/not-installed.guard';

const routes: Routes = [
  {
    path: 'installation',
    component: InstallationComponent,
    data: {
      title: 'Installation'
    },
    canActivate: [NotInstalledGuard]
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout'
    },
    canActivate: [InstalledGuard]
  },
  {
    path: '',
    component: WrapperComponent,
    canActivate: [InstalledGuard],
    children: [

      {
        path: 'senior',
        component: SeniorScreenComponent,
        data: {
          title: 'Senior Screen'
        },
      },
      {
        path: 'robot',
        component: RobotInterfaceComponent,
        data: {
          title: 'Robot'
        },
      },
      {
        path: 'cloud',
        component: CloudBrainComponent,
        data: {
          title: 'Cloud'
        },
      }
    ]
  },
  {
    path: 'test',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
