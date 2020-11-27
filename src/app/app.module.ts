import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InstallationComponent } from './components/pages/installation/installation.component';
import { LogoutComponent } from './components/pages/logout/logout.component';
import { HomeComponent } from './components/pages/home/home.component';
import { MqttModule } from 'ngx-mqtt';

@NgModule({
  declarations: [
    AppComponent,
    InstallationComponent,
    LogoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MqttModule.forRoot({
      connectOnCreate: false
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
