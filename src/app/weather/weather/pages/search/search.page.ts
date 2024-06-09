import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { distinctUntilChanged, debounceTime } from 'rxjs';

import { Location } from 'src/app/shared/models/location.model';
import { LocationService } from 'src/app/core/services/location.service';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss']
})
export class SearchPage implements OnInit {
  public searchCity: FormControl = new FormControl({
    "Version": 1,
    "Key": "215854",
    "Type": "City",
    "Rank": 31,
    "LocalizedName": "Tel Aviv",
    "Country": {
      "ID": "IL",
      "LocalizedName": "Israel"
    },
    "AdministrativeArea": {
      "ID": "TA",
      "LocalizedName": "Tel Aviv"
    }
  }, Validators.pattern('^[a-zA-Z ]*$'));
  public filteredLocations: Location[]
  public selectedCity: Location = this.searchCity.value;

  constructor(public dialog: MatDialog, private _locationService: LocationService, private _loaderService: LoaderService) {
  }

  ngOnInit() {
    this.searchCity.valueChanges.pipe(
      debounceTime(100),
      distinctUntilChanged()
    ).subscribe(() => this.searchCityByText());
  }

  onInput(event: any) {
    const inputValue: string = event.target.value;
    if (/[^A-Za-z]/.test(inputValue)) {
      event.target.value = inputValue.replace(/[^A-Za-z]*/g, '');
    }
  }

  public searchCityByText() {
    this._loaderService.addRequest();
    this._locationService.getAutocompleteLocation(this.searchCity.value)
      .subscribe({
        next: (res) => {
          this._loaderService.removeRequest();
          this.filteredLocations = res;
        },
        error: (err) => {
          this.dialog.open(ErrorDialogComponent);
          this._loaderService.removeRequest();
        }
      });
  }

  public displayCityName(location: Location): string {
    return location.LocalizedName
  }

  public OnSelectedCity() {
    this.selectedCity = this.searchCity.value
  }

  public displaySpecificWeather(location: Location): void {
    this.selectedCity = location
    this.searchCity.setValue(location)
  }
}