import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { FavoritesService } from 'src/app/core/services/favorites.service';
import { LoaderService } from 'src/app/core/services/loader.service';
import { WeatherService } from 'src/app/core/services/weather.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { Forecast } from 'src/app/shared/models/forecast.model';

@Component({
  selector: 'app-weather-by-city',
  templateUrl: './weather-by-city.component.html',
  styleUrls: ['./weather-by-city.component.scss']
})
export class WeatherByCityComponent implements OnInit, OnChanges {

  @Input()
  cityKey: string;
  public currentWeather: CurrentWeather
  public foreCast: Forecast
  public dateOfToday = new Date();
  public currentWetherValue: number;
  public formatWeather: string;

  constructor(public dialog: MatDialog, private _weatherService: WeatherService, private _favoriteService: FavoritesService, private _loaderService: LoaderService) { }

  ngOnInit(): void {
    this.getCurrentWeather()
    this.getForecast()
    this._weatherService.temperatureUnitChanged.subscribe({
      next: (res) => {
        this.formatWeather = res ? "F" : "C";
        this.currentWetherValue = res ? +this.currentWeather.Temperature.Imperial.Value : +this.currentWeather.Temperature.Metric.Value;
      }
    })
  }

  ngOnChanges(): void {
    this.getCurrentWeather()
    this.getForecast()
  }

  private getCurrentWeather() {
    this._loaderService.addRequest();
    this._weatherService.getCurrentWeather(this.cityKey).subscribe({
      next: (res) => {
        this._loaderService.removeRequest();
        this.currentWeather = res[0];
      },
      error: (err) => {
        this._loaderService.removeRequest();
        this.dialog.open(ErrorDialogComponent);
      }
    })
  }

  private getForecast() {
    this._loaderService.addRequest();
    this._weatherService.getForecast(this.cityKey).subscribe({
      next: (res) => {
    this._loaderService.removeRequest();
        this.foreCast = res
      },
      error: (err) => {
    this._loaderService.removeRequest();
     this.dialog.open(ErrorDialogComponent);
     }
    })
  }
}
