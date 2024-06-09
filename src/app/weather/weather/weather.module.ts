import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';

import { WeatherRoutingModule } from './weather-routing.module';
import { SearchPage } from './pages/search/search.page';
import { WeatherByCityComponent } from './pages/components/weather-by-city/weather-by-city.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FavoritesComponent } from './pages/components/favorites/favorites.component';

@NgModule({
  declarations: [SearchPage, WeatherByCityComponent, FavoritesComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, WeatherRoutingModule,
    MatCardModule, MatFormFieldModule,MatChipsModule],
})
export class WeatherModule { }
