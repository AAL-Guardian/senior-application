import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppointmentRecurrence } from 'src/app/models/appointment-recurrence.model';
import { AppointmentService } from 'src/app/services/appointment.service';
import { MqttService } from 'src/app/services/mqtt.service';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {
  
  appointments: AppointmentRecurrence[];

  get appointmentsNumber() {
    return { appointmentsNumber: ( this.appointments?.length || 0 ) }
  }

  constructor(
    private router: Router,
    private appointmentService: AppointmentService,
    private mqttService: MqttService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {

    this.appointmentService.getTodayAppointments().subscribe(
      appointments => {
        this.translate.get('Appointments.Title', { appointmentsNumber: this.appointmentsNumber }).subscribe(
          translation => {
            this.mqttService.showMessage(translation);
            this.appointments = appointments
          }
        )
      }
    )
  }

  back() {
    this.router.navigateByUrl('/');
  }
}
