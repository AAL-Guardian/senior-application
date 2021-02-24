import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InstallationService } from 'src/app/services/installation.service';

@Component({
  selector: 'app-installation',
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.scss']
})
export class InstallationComponent implements OnInit {

  installationForm = new FormGroup({
    robotCode: new FormControl(undefined, [Validators.required, Validators.pattern(/[0-9]{11}/)])
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
      'seniorApp' + Math.random().toString(16).substr(2, 8))
      .subscribe(
        res => this.router.navigateByUrl('/')
      );
  }

}
