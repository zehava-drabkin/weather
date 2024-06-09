import { Injectable } from '@angular/core';

import { Location } from 'src/app/shared/models/location.model';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: Location[] = [];

  addToFavorites(location: Location): void {
    this.favorites.push(location);
  }

  findFavorites(locationKey: string): number {
    const cityIndex = this.favorites.findIndex((favorite) => favorite.Key === locationKey);
    return cityIndex
  }

  removeFromFavorites(locationKey: string): void {
    const cityToRemoveIndex = this.findFavorites(locationKey);
    this.favorites.splice(cityToRemoveIndex, 1);
  }

  getFavorites(): Location[] {
    return this.favorites;
  }
}
