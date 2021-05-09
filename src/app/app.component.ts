import { Component, VERSION } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "./shared/location";
import { LocationStoreService } from "./shared/location-store.service";

@Component({
  selector: "pwr-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  listOn = true;
  detailsOn = true;

  location: Location;

  showList() {
    this.listOn = true;
    this.detailsOn = false;
  }
  showDetails(location: Location) {
    this.location = location;
    this.listOn = false;
    this.detailsOn = true;
  }

  /*`
    <pwr-location-list *ngIf="listOn"(showDetailsEvent)="showDetails($event)">
    </pwr-location-list>
    <pwr-location-details *ngIf="detailsOn" [location]="location" (showListEvent)="showList()"
   ></pwr-location-details>
  `*/
}
