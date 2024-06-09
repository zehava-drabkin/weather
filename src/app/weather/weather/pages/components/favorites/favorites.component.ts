import { Component, OnInit, Input, OnChanges, Output, EventEmitter } from '@angular/core';

import { FavoritesService } from 'src/app/core/services/favorites.service';
import { Location } from 'src/app/shared/models/location.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnChanges {
  @Input()
  selectedCity: Location;

  @Output()
  onDisplaySpecificFavorite: EventEmitter<Location> = new EventEmitter<Location>();

  public isCityFavorite: boolean;
  public action: string = "";
  public favorites: Location[] = [];

  constructor(private _favoritesService: FavoritesService) { }

  ngOnInit(): void {
    this.initFavorites();
    this.getFavorites()
  }

  ngOnChanges(): void {
    this.initFavorites();
  }

  private getFavorites(): void {
    this.favorites = this._favoritesService.getFavorites();
  }

  private initFavorites(): void {
    this.isCityFavorite = this._favoritesService.findFavorites(this.selectedCity.Key) != -1
    this.initAction(this.isCityFavorite);
  }

  public manageFavorites() {
    if (this.isCityFavorite) {
      this.removeFromFavorite();
      this.isCityFavorite = false;
    }
    else {
      this.saveToFavorite();
      this.isCityFavorite = true;
    }
    this.initAction(this.isCityFavorite);
  }

  public initAction(isFavorite: boolean): void {
    this.action = isFavorite ? "remove from favorites" : "add to favorites";
  }

  private saveToFavorite() {
    this._favoritesService.addToFavorites(this.selectedCity);
  }

  public removeFromFavorite(locationKey?: string) {
    const key = locationKey ? locationKey : this.selectedCity.Key
    this._favoritesService.removeFromFavorites(key);
    this.getFavorites();
    if (locationKey === this.selectedCity.Key)
      this.isCityFavorite = false
    this.initAction(false);
  }

  public displayWeather(location: Location) {
    this.onDisplaySpecificFavorite.emit(location);
  }
}
