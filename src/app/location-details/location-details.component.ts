import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LocationFactory } from "../shared/location-factory";
import { Location } from "../shared/location";
import { LocationStoreService } from "../shared/location-store.service";

@Component({
  selector: "pwr-location-details",
  templateUrl: "./location-details.component.html",
  styles: []
})
export class LocationDetailsComponent implements OnInit {
  location: Location = LocationFactory.empty();
   
  

  //@Input() location: Location;

  @Output() showListEvent = new EventEmitter<any>();
  constructor(
    private ls: LocationStoreService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  showLocationList() {
    this.showListEvent.emit();
  }

  removeLocation() {
    if (confirm("Location"+this.location.id+" wirklich löschen?")) {
      this.ls
        .remove(this.location.id)
        .subscribe(res =>
          this.router.navigate(["../"], { relativeTo: this.route })
        );
    }
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    console.log(params);
   this.ls
      .getSingle(+params["id"])
      .subscribe(l => (this.location = l));


  }
}
