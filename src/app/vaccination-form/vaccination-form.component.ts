import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vaccination, Location } from '../shared/location';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { VaccinationStoreService } from '../shared/vaccination-store.service';
import { VaccinationFormErrorMessages } from './vaccination-form-error-messages';
import moment from 'moment';
import { LocationStoreService } from '../shared/location-store.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'pwr-vaccination-form',
  templateUrl: './vaccination-form.component.html',
  styleUrls: ['./vaccination-form.component.css']
})
export class VaccinationFormComponent implements OnInit {
  vaccinationForm: FormGroup;
  datePipeStart: string;
  datePipeEnd: string;
  locations: Location[];
  vaccination = VaccinationFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingVaccination = false;

  constructor(
    private fb: FormBuilder,
    private vs: VaccinationStoreService,
    private ls: LocationStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}
  ngOnInit() {
    this.ls.getAll().subscribe(res => (this.locations = res));

    const id = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params);
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
    /* console.log("date" + this.vaccination.date);
      this.datePipeStart = this.datePipe.transform(this.vaccination.startTime, 'HH:mm:ss');
      this.datePipeEnd = this.datePipe.transform(this.vaccination.endTime, 'HH:mm:ss');
      console.log("test"+this.vaccination.date+"___ "+this.datePipeStart);*/

    this.vaccinationForm = this.fb.group({
      id: this.vaccination.id,
      maxUsers: [
        this.vaccination.maxUsers,
        [Validators.required, Validators.min(1)]
      ],
      location_id: [this.vaccination.location_id],

      location: [this.vaccination.location.city]

      /*date: [this.vaccination.date, Validators.required]
       startTime: [this.vaccination.startTime, Validators.required],
      endTime: [this.vaccination.endTime, Validators.required]*/
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

    /*
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
    updatedVacevent.date = date; */

    console.log('VacForm');
    console.log(this.vaccinationForm.value);
    const updatedVaccination: Vaccination = VaccinationFactory.fromObject(
      this.vaccinationForm.value
    );

    //deep copy - did not work without??

    console.log(updatedVaccination);
    //just copy the authors
    //updatedVaccination.date = "2015-09-23";
    //updatedVaccination.startTime = new Date();
    //updatedVaccination.endTime = new Date();

    updatedVaccination.users = this.vaccination.users;

    this.ls
      .getSingle(this.vaccinationForm.controls['location_id'].value)
      .subscribe(res => {
        updatedVaccination.location = res;
      });

    if (this.isUpdatingVaccination) {
      this.vs.update(updatedVaccination).subscribe(res => {
        this.router.navigate(['../../vaccinations', updatedVaccination.id], {
          relativeTo: this.route
        });
        console.log(updatedVaccination.maxUsers + ' but why');
      });
    } else {
      //vaccination.user_id = 1; // jsut for testing
      console.log(updatedVaccination);
    }
  }
}
