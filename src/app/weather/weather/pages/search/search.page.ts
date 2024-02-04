import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/core/services/location.service';
import { Location } from 'src/app/shared/models/location.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FavoritesService } from 'src/app/core/services/favorites.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage {

  constructor(private router: Router, private locationService: LocationService, private favoritesService: FavoritesService) { }
  searchQuery: string
  autocompleteResults: Location[];
  locationKey: string;
  isInFavorites: boolean = false;
  selectedLocation: Location;

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.selectedLocation = event.option.value;
    this.locationKey = this.selectedLocation.Key;
    this.isInFavorites = this.favoritesService.isInFavorites(this.locationKey);
    this.router.navigate(['/search', this.locationKey]);
  }
  displayFn(location: Location): string {
    return location ? `${location.LocalizedName}, ${location.Country.LocalizedName}` : '';
  }
  isInFavorites1(Key: string): boolean {
    console.log("Checking isInFavorites1 for Key:", Key);
    var inFavorites = this.favoritesService.isInFavorites(Key);
    return inFavorites;
  }
  searchLocations(): void {
    if (this.searchQuery) {
      console.log("this.searchQuery", this.searchQuery);
      this.locationService.getAutocompleteLocation(this.searchQuery)
        .subscribe(
          locations => {
            this.autocompleteResults = locations;
            console.log(this.autocompleteResults[0].Key);
          },
          error => {
            console.error(error);
          }
        );
    }
  }
  onSlideToggleChange(): void {
    if (this.selectedLocation) {
      if (this.isInFavorites) {
        this.removeFromFavorites();
      } else {
        this.addToFavorites();
      }
    }
  }
  addToFavorites(): void {
    this.favoritesService.addToFavorites(this.selectedLocation);
    this.isInFavorites = true;
  }
  removeFromFavorites(): void {
    this.favoritesService.removeFromFavorites(this.locationKey);
    this.isInFavorites = false;
  }

}