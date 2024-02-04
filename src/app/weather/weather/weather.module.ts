import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchPage } from './pages/search/search.page';
import { WeatherRoutingModule } from './weather-routing.module';
import { WeatherDetailsComponent } from './pages/weather-details/weather-details.component';
import { WeatherCurrentComponent } from './pages/weather-current/weather-current.component';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [SearchPage, WeatherDetailsComponent, WeatherCurrentComponent],
  imports:
    [CommonModule,
      WeatherRoutingModule,
      MatInputModule,
      MatCardModule,
      MatGridListModule,
      SharedModule,
    ],
})
export class WeatherModule { }
