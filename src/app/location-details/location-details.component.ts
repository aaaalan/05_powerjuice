import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LocationFactory } from "../shared/location-factory";
import { Location } from "../shared/location";
import { LocationStoreService } from "../shared/location-store.service";
import { AuthenticationService } from "../shared/authentication-service";
import { UserStoreService } from "../shared/user-store.service";
import { User } from "../shared/user";

@Component({
  selector: "pwr-location-details",
  templateUrl: "./location-details.component.html",
  styles: []
})
export class LocationDetailsComponent implements OnInit {
  location: Location = LocationFactory.empty();
     loggedInUser: User;

  

  //@Input() location: Location;

  @Output() showListEvent = new EventEmitter<any>();
  constructor(
    private ls: LocationStoreService,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthenticationService,
        private us: UserStoreService

  ) {}

  showLocationList() {
    this.showListEvent.emit();
  }

  isLoggedIn() {
   
    return this.authService.isLoggedIn();
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
    //console.log(params);
   this.ls
      .getSingle(+params["id"])
      .subscribe(l => (this.location = l));
    if (this.authService.isLoggedIn()) {
      this.us
        .getSingle(localStorage.userId)
        .subscribe(res => (this.loggedInUser = res));
    }

  }
}
