import { Component, Input, OnInit } from "@angular/core";
import { Location } from "../shared/location";

@Component({
  selector: "a.pwr-location-list-item",
  templateUrl: "./location-list-item.component.html",
  styleUrls: ["./location-list-item.component.css"]
})
export class LocationListItemComponent implements OnInit {
  @Input() location: Location;
  constructor() {}

  ngOnInit() {
    console.log(this.location);
  }
}
