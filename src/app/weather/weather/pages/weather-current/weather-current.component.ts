import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from 'src/app/core/services/weather.service';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { Location } from 'src/app/shared/models/location.model';

@Component({
  selector: 'app-weather-current',
  templateUrl: './weather-current.component.html',
  styleUrls: ['./weather-current.component.scss']
})
export class WeatherCurrentComponent implements OnInit {
  getWeather: CurrentWeather;
  Favorites: Location[] = [];
  locationKey: string = '';
  TypeCurrentWeather: boolean = true;
  constructor(private route: ActivatedRoute, private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.weatherCurrent()
    this.weatherService.temperatureUnitChanged.subscribe(() => {
      this.TypeCurrentWeather = !this.TypeCurrentWeather;
    });
  }

  weatherCurrent() {
    this.route.params.subscribe(params => {
      this.locationKey = params['locationKey'];
      if (this.locationKey == null || this.locationKey == undefined) {
        this.weatherService.getCurrentWeather('215854').subscribe(
          data => {
            this.getWeather = data;
          },
          error => {
            console.error(error);
          }
        );
      }
      else
        this.weatherService.getCurrentWeather(this.locationKey).subscribe(
          data => {
            this.getWeather = data;
          },
          error => {
            console.error(error);
          }
        );
    })
  }

}
