import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FavoritesService } from 'src/app/core/services/favorites.service';
import { LocationService } from 'src/app/core/services/location.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { DailyForecast, Forecast } from 'src/app/shared/models/forecast.model';
import { Location } from 'src/app/shared/models/location.model';


@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit{
  city:string;
  options:Location[];
  locationChoosen:Location;
  currentWeather:CurrentWeather;
  forecast:Forecast;
  dailyForecasts:DailyForecast[];
  ifChoosen:boolean=false;
   
  constructor(private _route: ActivatedRoute,private _serviceLocation:LocationService, private _serviseWeather:WeatherService,private _serviseFavorite:FavoritesService){}
  ngOnInit(): void {
    this.currentWeather=this._serviseWeather.getCURRENT_WEATHER();
    this.forecast=this._serviseWeather.getFORECAST();
    this.dailyForecasts=this.forecast.DailyForecasts;
    this._route.paramMap.subscribe(path=>{
      if(path.has('locationKey'))
      {
        let locationKey=String(path.get('locationKey'));
        // this._serviceLocation.getLocationByKey(locationKey).subscribe(res=>{
        //   this.locationChoosen=res;
        // });
        this.locationChoosen=this._serviceLocation.getLOCATION();
        this.ifChoosen=true;
      }
    });
    

    
  }
  
  onInputChange()
  {
    // this._serviceLocation.getAutocompleteLocation(this.city).subscribe(res=>{
    //   this.options= res;
    // });   
    this.options=this._serviceLocation.getLocations();
  }
  optionClicked(option:Location)
  {
    //.LocalizedName,option.Key
    this.city=option.LocalizedName;
    this.locationChoosen=option;
    this.ifChoosen=true;
    // this._serviseWeather.getCurrentWeather(option.Key).subscribe(res=>{
    // this.currentWeather=res;
    // console.log(res);
    //  });
    this.currentWeather=this._serviseWeather.getCURRENT_WEATHER();
    // this._serviseWeather.getForecast(option.Key).subscribe(res=>{
    // this.forecast=res;
    // console.log(JSON.stringify(res));
    // });
    this.currentWeather=this._serviseWeather.getCURRENT_WEATHER();
    this.forecast=this._serviseWeather.getFORECAST();
    this.dailyForecasts=this.forecast.DailyForecasts;
    
  }
  addToFavorite()
  {
    if(this.locationChoosen!=undefined)
    {
      this._serviseFavorite.addToFavorites(this.locationChoosen);
    }
  }
  
  

  
}

