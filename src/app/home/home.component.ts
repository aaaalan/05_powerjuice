import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '../shared/location';

@Component({
  selector: 'pwr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private route :ActivatedRoute) { }

  locationSelected(location: Location){
    this.router.navigate(['../locations', location.id], {relativeTo:this.route});
  }

  ngOnInit() {
  }

}