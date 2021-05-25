import { Component, Input, OnInit } from '@angular/core';
import { Vaccination } from '../shared/location';

@Component({
  selector: 'a.pwr-vaccination-list-item',
  templateUrl: './vaccination-list-item.component.html',
  styleUrls: ['./vaccination-list-item.component.css']
})
export class VaccinationListItemComponent implements OnInit {
  @Input() vaccination: Vaccination;
  constructor() {}

  ngOnInit() {
  //  console.log(this.vaccination);
  }
}
