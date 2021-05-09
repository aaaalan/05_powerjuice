import { Component, OnInit } from '@angular/core';
import { Vaccination } from '../shared/location';
import { VaccinationStoreService } from '../shared/vaccination-store.service';

@Component({
  selector: 'pwr-vaccination-list',
  templateUrl: './vaccination-list.component.html',
  styleUrls: ['./vaccination-list.component.css']
})
export class VaccinationListComponent implements OnInit {
  constructor(private vs: VaccinationStoreService) {}
  vaccinations: Vaccination[];

  ngOnInit() {
        this.vs.getAll().subscribe(res => this.vaccinations = res);
  }
}
