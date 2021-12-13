import { Component, OnInit } from '@angular/core';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { Location } from 'src/app/shared/models/location.model';
import { Router } from "@angular/router";
import swal from 'sweetalert';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss']
})
export class FavoritesPage implements OnInit{
  favoriteLocations:Location[];
   
  constructor(private _serviseFavorite:FavoritesService,private router: Router){}
  ngOnInit(): void {
    this.favoriteLocations=this._serviseFavorite.getFavorites()
    console.log(this.favoriteLocations);
  }
  removeFavoriteLocation(key)
  {
    this._serviseFavorite.removeFromFavorites(key);
    swal("deleted","the city delet from the favorite list","success");
  }
  navigeWeatherOfLocation(favoriteKey)
  {
    
    this.router.navigate(["search",favoriteKey]);

  }

  
}
