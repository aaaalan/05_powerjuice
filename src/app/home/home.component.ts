import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../shared/authentication-service';
import { Location } from '../shared/location';
import { User } from '../shared/user';
import { UserStoreService } from '../shared/user-store.service';

@Component({
  selector: 'pwr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedInUser: User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private us: UserStoreService, 
    private authService: AuthenticationService
  ) {}

  locationSelected(location: Location) {
    this.router.navigate(['../locations', location.id], {
      relativeTo: this.route
    });
  }
isLoggedIn() {
   
    return this.authService.isLoggedIn();
  }

ngOnInit(){
  
}


  ngAfterViewInit() {
        if (this.authService.isLoggedIn()) {
      this.us
        .getSingle(localStorage.userId)
        .subscribe(res => (this.loggedInUser = res));
    }
  }
}
