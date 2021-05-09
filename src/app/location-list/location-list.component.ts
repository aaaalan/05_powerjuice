import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Vaccination } from "../shared/location";
import { User } from "../shared/user";
import { Location } from "../shared/location";

import { LocationStoreService } from "../shared/location-store.service";

@Component({
  selector: "pwr-location-list",
  templateUrl: "./location-list.component.html",
  styles: []
})
export class LocationListComponent implements OnInit {
  constructor(private ls: LocationStoreService) {}
  locations: Location[];

  ngOnInit() {
    this.ls.getAll().subscribe(res => this.locations = res);
  }
}
