import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { Vaccination } from '../shared/location';
import { User } from '../shared/user';
import { UserFactory } from '../shared/user-factory';
import { UserStoreService } from '../shared/user-store.service';
import { UserValidators } from '../shared/user-validators';
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
    private datePipe: DatePipe, 
    private authService: AuthenticationService
  ) {}

  ngOnInit() {
    
    const id = this.route.snapshot.params['id'];
    //console.log("HALLO" + this.vaccination.id);
   console.log('ID:  | ' + this.route.snapshot);
    if (id) {
      this.isUpdatingUser = true;
      this.us.getSingle(id).subscribe(user => {
        this.user = user;
        this.initUser();
      });
      //this.initUpdateUser();
    }
    this.initUser();
  }

 isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  initUser() {
    this.userForm = this.fb.group({
      id: this.user.id,
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      email: [this.user.email , [Validators.required], this.isUpdatingUser?null:UserValidators.emailExists(this.us)],
      phone: [this.user.phone,  Validators.required],
      sex: [this.user.sex, Validators.required],
      password: '$2y$10$5Wep7W2vPo4EWYc.1wbJte3ChN5jLmEkL52bTOt51/EdKM2F8UH5.',
      isAdmin: this.user.isAdmin,
      isVaccinated: this.user.isVaccinated,
      ssn: [this.user.ssn , [Validators.required],this.isUpdatingUser?null:UserValidators.userExists(this.us)], 
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
      console.log('IS UPDATING');
      user.vaccination_id = this.user.vaccination_id;
      this.us.update(user).subscribe(res => {
        this.router.navigate(
          ['../../../vaccinations', user.vaccination_id],
          { relativeTo: this.route }
        );
      });
    } else {
      console.log('Erstellen');
      user.id = 1; // jsut for testing
      //  vaccination.location_id = +vaccination.location_id;
      console.log(user);
      this.us.create(user).subscribe(res => {
        //this.vaccination = VaccinationFactory.empty();
        //this.vaccinationForm.reset(VaccinationFactory.empty());
        this.router.navigate(
          ['../../vaccinations', this.route.snapshot.params['vaccination_id']],
          { relativeTo: this.route }
        );
      });
    }
  }
}
