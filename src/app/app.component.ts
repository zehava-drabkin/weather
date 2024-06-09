import { Component, OnInit } from '@angular/core';

import { LoaderService } from './core/services/loader.service';
import { WeatherService } from './core/services/weather.service';
import { ToggleColorService } from './core/services/toggle-color.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  displayLoading = false;

  constructor(private loaderService: LoaderService, private weatherService: WeatherService, private toggleColorService: ToggleColorService) { }

  ngOnInit() {
    this.loaderService.stateChange.subscribe((loaderState) => {
      setTimeout(() => {
        this.displayLoading = loaderState;
      });
    });
  }

  changeTemperatureUnit() {
    this.weatherService.isMetric = !this.weatherService.isMetric;
    this.weatherService.temperatureUnitChanged.next(this.weatherService.isMetric);
  }

  toggleDarkTheme() {
    this.toggleColorService.toggleToDark();
  }

}
