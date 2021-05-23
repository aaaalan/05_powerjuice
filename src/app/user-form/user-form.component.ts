import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { Vaccination } from '../shared/location';
import { User } from '../shared/user';
import { UserFactory } from '../shared/user-factory';
import { UserStoreService } from '../shared/user-store.service';
import { VaccinationStoreService } from '../shared/vaccination-store.service';
import { UserFormErrorMessages } from './user-form-error-messages';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user: User = UserFactory.empty();
  userForm: FormGroup;
  vaccination: Vaccination;
  errors: { [key: string]: string } = {};
  isUpdatingUser = false;

  @Output() showListEvent = new EventEmitter<any>();
  constructor(
    private fb: FormBuilder,
    private vs: VaccinationStoreService,
    private us: UserStoreService,
    private route: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];

    console.log('ID:  | ' + this.route.snapshot);
    if (id) {
      this.isUpdatingUser = true;
      this.vs.getSingle(id).subscribe(vaccination => {
        this.vaccination = vaccination;
        this.initUser();
      });
    }
    this.initUser();
  }

  initUser() {
    /* console.log("date" + this.vaccination.date);
      this.datePipeStart = this.datePipe.transform(this.vaccination.startTime, 'HH:mm:ss');
      this.datePipeEnd = this.datePipe.transform(this.vaccination.endTime, 'HH:mm:ss');
      console.log("test"+this.vaccination.date+"___ "+this.datePipeStart);*/

    this.userForm = this.fb.group({
      id: this.user.id,
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
      sex: this.user.sex,
      password: 'secret',
      isAdmin: this.user.isAdmin,
      isVaccinated: this.user.isVaccinated,
      ssn: this.user.ssn,
      vaccination_id: +this.route.snapshot.params['vaccination_id']
    });
    this.userForm.statusChanges.subscribe(() => this.updateErrorMessages());
  }
  updateErrorMessages() {
    console.log('Is invalid? ' + this.userForm.invalid);
    this.errors = {};
    for (const message of UserFormErrorMessages) {
      const control = this.userForm.get(message.forControl);
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
    console.log(this.userForm.value);
    const user: User = UserFactory.fromObject(this.userForm.value);
    console.log(this.isUpdatingUser);
    if (this.isUpdatingUser) {
      this.us.update(user).subscribe(res => {
        this.router.navigate(['../../users', user.id], {
          relativeTo: this.route
        });
      });
    } else {
      console.log('Erstellen');
      user.id = 1; // jsut for testing
      //  vaccination.location_id = +vaccination.location_id;
      console.log(user);
      this.us.create(user).subscribe(res => {
        //this.vaccination = VaccinationFactory.empty();
        //this.vaccinationForm.reset(VaccinationFactory.empty());
        this.router.navigate(['../users'], { relativeTo: this.route });
      });
    }
  }
}
