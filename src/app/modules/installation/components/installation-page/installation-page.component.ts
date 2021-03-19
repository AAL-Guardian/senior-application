import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstallationService } from 'src/app/services/installation.service';

@Component({
  selector: 'app-installation-page',
  templateUrl: './installation-page.component.html',
  styleUrls: ['./installation-page.component.scss']
})
export class InstallationPageComponent implements OnInit {
  installationForm = new FormGroup({
    clientId: new FormControl(undefined, [Validators.required, Validators.pattern(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i)]),
    robotCode: new FormControl(undefined, [Validators.required, Validators.pattern(/[0-9]{11}/)]),

  });

  constructor(
    private installationService: InstallationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  submit() {
    this.installationService.install(
      this.installationForm.value.robotCode,
      this.installationForm.value.clientId,
    ).subscribe(
        res => this.router.navigateByUrl('/')
      );
  }
}
