import { Component, VERSION } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from './shared/authentication-service';
import { Location } from './shared/location';
import { LocationStoreService } from './shared/location-store.service';

@Component({
  selector: 'pwr-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  listOn = true;
  detailsOn = true;

  location: Location;

  constructor(private authService: AuthenticationService) {}

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }
  showDetails(location: Location) {
    this.location = location;
    this.listOn = false;
    this.detailsOn = true;
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

  /*`
    <pwr-location-list *ngIf="listOn"(showDetailsEvent)="showDetails($event)">
    </pwr-location-list>
    <pwr-location-details *ngIf="detailsOn" [location]="location" (showListEvent)="showList()"
   ></pwr-location-details>
  `*/
}
