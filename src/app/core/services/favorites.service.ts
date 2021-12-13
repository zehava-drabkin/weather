import { Injectable } from '@angular/core';
import { Location } from 'src/app/shared/models/location.model';
import swal from 'sweetalert';



// import swal from 'sweetalert';
@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: Location[] = [];
  
  addToFavorites(location: Location): void {
    let flag=false;
    for(let i=0;i<this.favorites.length;i++)
    {
      if(this.favorites[i].Key==location.Key)
      {
        swal("erroe!", "The city is already on the favorites list", "error")
        flag=true;
      }
    }
    if(flag==false)
    {
    this.favorites.push(location);
    swal("added successfully!", "The city has been successfully added to the favorites list", "success")
     }
  }

  removeFromFavorites(locationKey: string): void {
    const cityToRemoveIndex = this.favorites.findIndex((favorite) => favorite.Key === locationKey);
    this.favorites.splice(cityToRemoveIndex, 1);
  }

  getFavorites(): Location[] {
    return this.favorites;
  }
}
