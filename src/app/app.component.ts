import { Component, VERSION } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './shared/authentication-service';
import { Location } from './shared/location';
import { LocationStoreService } from './shared/location-store.service';
import { User } from './shared/user';
import { UserStoreService } from './shared/user-store.service';

@Component({
  selector: 'pwr-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  listOn = true;
  detailsOn = true;
  userName = '';
  location: Location;
  loggedInUser: User;


  constructor(
    private authService: AuthenticationService,
    private us: UserStoreService
  ) {}

 fetchUserData(){
    if (this.isLoggedIn()) {
      this.userName = localStorage.getItem("firstName");
        this.us
        .getSingle(localStorage.userId)
        .subscribe(res => (this.loggedInUser = res));
    }
  }

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }
  showDetails(location: Location) {
    this.location = location;
    this.listOn = false;
    this.detailsOn = true;
  }

  ngOnInit() {
    this.fetchUserData();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  getLoginLabel() {
    if (this.isLoggedIn()) {
      return 'Logout';
    } else {
      return 'Login';
    }
  }
    getLoginIcon() {
    if (this.isLoggedIn()) {
      return 'sign-in icon';
    } else {
      return 'sign-out icon';
    }
  }

  /*`
    <pwr-location-list *ngIf="listOn"(showDetailsEvent)="showDetails($event)">
    </pwr-location-list>
    <pwr-location-details *ngIf="detailsOn" [location]="location" (showListEvent)="showList()"
   ></pwr-location-details>
  `*/
}
