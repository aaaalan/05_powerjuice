import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { Vaccination } from '../shared/location';
import { LocationFactory } from '../shared/location-factory';
import { VaccinationFactory } from '../shared/vaccination-factory';
import { VaccinationStoreService } from '../shared/vaccination-store.service';

@Component({
  selector: 'app-vaccination-details',
  templateUrl: './vaccination-details.component.html',
  styleUrls: ['./vaccination-details.component.css']
})
export class VaccinationDetailsComponent implements OnInit {
  vaccination: Vaccination = VaccinationFactory.empty();

  @Output() showListEvent = new EventEmitter<any>();
  constructor(
    private vs: VaccinationStoreService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService
  ) {}

  showLocationList() {
    this.showListEvent.emit();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  hasMaxVaccinations(){
    if(this.vaccination.users.length >= this.vaccination.maxUsers){
      return false;
    } 
    return true;
  }

  removeVaccination() {
    if (confirm('Vaccination' + this.vaccination.id + ' wirklich löschen?')) {
      this.vs
        .remove(this.vaccination.id)
        .subscribe(res =>
          this.router.navigate(['../'], { relativeTo: this.route })
        );
    }
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    console.log(+params['id']);
    this.vs.getSingle(+params['id']).subscribe(l => (this.vaccination = l));
  }
}
