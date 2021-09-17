import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Robot } from '../models/robot.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }

  getRobotSettings() {
    return this.http.get<Robot>(environment.apiEndpoint + '/robot/settings')
  }
  
  setRobotSettings(robot: Robot) {
    return this.http.post<Robot>(environment.apiEndpoint + '/robot/settings', robot)
  }
}
