import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {
  debounceTime,
  distinctUntilChanged,
filter,
  switchMap,
  tap
} from "rxjs/operators";
import { Location } from "../../shared/location";
import { LocationStoreService } from "../../shared/location-store.service";

@Component({
  selector: "pwr-search",
  templateUrl: "./search.component.html",
  styles: []
})
export class SearchComponent implements OnInit {
 

  foundLocations: Location[] = [];
  isLoading = false;
  keyup = new EventEmitter<string>();
  @Output() locationSelected = new EventEmitter<Location>();

 constructor(private ls: LocationStoreService) {}


  ngOnInit() {
    this.keyup
    .pipe(filter(term=>term!=""))
      .pipe(debounceTime(500))
      .pipe(distinctUntilChanged())
      .pipe(tap(() => (this.isLoading = true)))
      .pipe(switchMap(searchTerm => this.ls.getAllSearch(searchTerm)))
      .pipe(tap(() => (this.isLoading = false)))
      .subscribe(locations => this.foundLocations = locations);
  }
}
