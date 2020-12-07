import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MqttModule } from 'ngx-mqtt';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CloudBrainComponent } from './components/pages/cloud-brain/cloud-brain.component';
import { HomeComponent } from './components/pages/home/home.component';
import { InstallationComponent } from './components/pages/installation/installation.component';
import { LogoutComponent } from './components/pages/logout/logout.component';
import { RobotInterfaceComponent } from './components/pages/robot-interface/robot-interface.component';
import { SeniorScreenComponent } from './components/pages/senior-screen/senior-screen.component';
import { WrapperComponent } from './components/pages/wrapper/wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    InstallationComponent,
    LogoutComponent,
    HomeComponent,
    SeniorScreenComponent,
    CloudBrainComponent,
    RobotInterfaceComponent,
    WrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    MqttModule.forRoot({
      connectOnCreate: false
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
