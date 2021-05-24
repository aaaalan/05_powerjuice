import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationFactory } from '../shared/location-factory';
import { LocationStoreService } from '../shared/location-store.service';
import { VaccinationStoreService } from '../shared/vaccination-store.service';
import {  Location } from '../shared/location';
@Component({
  selector: 'app-location-form',
  templateUrl: './location-form.component.html',
  styleUrls: ['./location-form.component.css']
})
export class LocationFormComponent implements OnInit {
  locationForm: FormGroup;
  location = LocationFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingLocation = false;
  constructor(
    private fb: FormBuilder,
    private vs: VaccinationStoreService,
    private ls: LocationStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    //this.ls.getAll().subscribe(res => (this.locations = res));

    const id = this.route.snapshot.params['id'];
    console.log(this.route.snapshot.params);
    if (id) {
      this.isUpdatingLocation = true;
      this.ls.getSingle(id).subscribe(location => {
        this.location = location;
        this.initLocation();
      });
    }
    this.initLocation();
  }
  initLocation() {
    /*         "id": 2,
        "name": "Impfzentrum Rotes Kreuz",
        "street": "Zur Saftstation 5",
        "zipcode": 4614,
        "city": "Marchtrenk",*/

    this.locationForm = this.fb.group({
      id: this.location.id,
      name: this.location.name,
      street: this.location.street,
      zipcode: this.location.zipcode,
      city: this.location.city
    });
    /* this.locationForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    ); */
  }

  submitForm() {
    // console.log('VacForm');
    //console.log(this..value);
    const location: Location = LocationFactory.fromObject(
      this.locationForm.value
    );

    //deep copy - did not work without??

    console.log(location);

    // so gehts.. keine Ahnung warum. Nicht anfassen, alan!
    

    if (this.isUpdatingLocation) {
      this.ls.update(location).subscribe(res => {
        this.router.navigate(['../../locations', location.id], {
          relativeTo: this.route
        });
      });
    } else {
      location.id = 1; // jsut for testing
      console.log('Erstellen');
     
      console.log(location);
      this.ls.create(location).subscribe(res => {
        //this.vaccination = VaccinationFactory.empty();
        //this.vaccinationForm.reset(VaccinationFactory.empty());
        this.router.navigate(['../'], { relativeTo: this.route });
      });
    }
  }


  /* updateErrorMessages() {
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
  } */
}
