import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from 'src/app/core/services/weather.service';
import { Forecast } from 'src/app/shared/models/forecast.model';

@Component({
  selector: 'app-weather-details',
  templateUrl: './weather-details.component.html',
  styleUrls: ['./weather-details.component.scss']
})
export class WeatherDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute, private weatherService: WeatherService) { }
  locationKey: string
  fiveDayForecast: any

  ngOnInit(): void {
    this.forecast()
  }
  forecast() {
    this.route.params.subscribe(params => {
      this.locationKey = params['locationKey'];
      if (this.locationKey != null || this.locationKey != undefined) {
        this.weatherService.getForecast(this.locationKey).subscribe(
          data => {
            this.fiveDayForecast = data.DailyForecasts;
          },
          error => {
            console.error(error);
          }
        );
      }
    });

  }


}
