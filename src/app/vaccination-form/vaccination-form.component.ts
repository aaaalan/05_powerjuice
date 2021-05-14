import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccination } from '../shared/location';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { VaccinationStoreService } from '../shared/vaccination-store.service';
import { VaccinationFormErrorMessages } from './vaccination-form-error-messages';
import moment from 'moment';
@Component({
  selector: 'pwr-vaccination-form',
  templateUrl: './vaccination-form.component.html',
  styleUrls: ['./vaccination-form.component.css']
})
export class VaccinationFormComponent implements OnInit {
  vaccinationForm: FormGroup;
  vaccination = VaccinationFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingVaccination = false;

  constructor(
    private fb: FormBuilder,
    private vs: VaccinationStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isUpdatingVaccination = true;
      this.vs.getSingle(id).subscribe(vaccination => {
        this.vaccination = vaccination;
        this.initVaccianation();
      });
    }
    this.initVaccianation();
  }
  initVaccianation() {
    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      location: [this.vaccination.location.city],
      maxUsers: [this.vaccination.maxUsers, [Validators.required, Validators.min(1)]],
      date: [this.vaccination.date, Validators.required],
      startTime: [this.vaccination.startTime, Validators.required],
      endTime: [this.vaccination.endTime, Validators.required]
    });
    this.vaccinationForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    );
  }

  updateErrorMessages() {
    console.log('Is invalid? ' + this.vaccinationForm.invalid);
    this.errors = {};
    for (const message of VaccinationFormErrorMessages) {
      const control = this.vaccinationForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    // filter empty values

    let updatedVacevent: Vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );
    console.log(this.vaccinationForm.value.startTime);
    const date = moment(this.vaccinationForm.value.date).toDate();
    const startTimeNew = moment(
      this.vaccinationForm.value.date +
        ' ' +
        this.vaccinationForm.value.startTime
    ).toDate();
    const endTimeNew = moment(
      this.vaccinationForm.value.date + ' ' + this.vaccinationForm.value.endTime
    ).toDate();
    updatedVacevent.startTime = startTimeNew;
    updatedVacevent.endTime = endTimeNew;
    updatedVacevent.date = date;

    const vaccination: Vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );
    //deep copy - did not work without??
    console.log(vaccination);
    //just copy the authors
    vaccination.users = this.vaccination.users;
    if (this.isUpdatingVaccination) {
      this.vs.update(vaccination).subscribe(res => {
        this.router.navigate(['../../vaccinations', vaccination.id], {
          relativeTo: this.route
        });
      });
    } else {
      //vaccination.user_id = 1; // jsut for testing
      console.log(vaccination);
    }
  }
}
