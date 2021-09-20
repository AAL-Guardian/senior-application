import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppointmentRecurrence } from '../models/appointment-recurrence.model';
import { Appointment } from '../models/appointment.mode';
import { Robot } from '../models/robot.model';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  constructor(private http: HttpClient) { }

  getTodayAppointments() {
    return this.http.get<AppointmentRecurrence[]>(environment.apiEndpoint + '/appointment/today')
  }
  
  setRobotSettings(robot: Robot) {
    return this.http.post<Robot>(environment.apiEndpoint + '/robot/settings', robot)
  }
}
