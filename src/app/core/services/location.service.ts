import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Location } from 'src/app/shared/models/location.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private httpClient: HttpClient) {}

  getAutocompleteLocation(searchText: string): Observable<Location[]> {
    let params: HttpParams = new HttpParams();
    params = params.append('apikey', environment.apiKey);
    params = params.append('q', searchText);
    
    return this.httpClient.get<Location[]>('http://dataservice.accuweather.com/locations/v1/cities/autocomplete', { params });

    
  }
  getLOCATION():Location
  {
    return {
      AdministrativeArea: { ID: '13', LocalizedName: 'Tokyo' },
      Country: { ID: 'JP', LocalizedName: 'Japan' },
      Key: "226396",
      LocalizedName: "Tokyo",
      Rank: 10,
      Type: "City",
      Version: 1
    }
  }

  getLocationByKey(locationKey: string): Observable<Location> {
    let params: HttpParams = new HttpParams();
    params = params.append('apikey', environment.apiKey);

    return this.httpClient.get<Location>(`http://dataservice.accuweather.com/locations/v1/${locationKey}`, { params });
  }
  getLocations():Location[]
  {
    return this.LOCATIONS;
  }
  LOCATIONS: Location[] = [{
    AdministrativeArea: { ID: '13', LocalizedName: 'Tokyo' },
    Country: { ID: 'JP', LocalizedName: 'Japan' },
    Key: "226396",
    LocalizedName: "Tokyo",
    Rank: 10,
    Type: "City",
    Version: 1
  }, 
  {
    AdministrativeArea: { ID: 'SX', LocalizedName: 'Shanxi' },
    Country: { ID: 'CN', LocalizedName: 'China' },
    Key: "106770",
    LocalizedName: "Taiyuan",
    Rank: 11,
    Type: "City",
    Version: 1
  }, {
    AdministrativeArea: { ID: 'TJ', LocalizedName: 'Tianjin' },
    Country: { ID: 'CN', LocalizedName: 'China' },
    Key: "106780",
    LocalizedName: "Tianjin",
    Rank: 11,
    Type: "City",
    Version: 1
  }, {
    AdministrativeArea: { ID: 'GZ', LocalizedName: 'Guizhou' },
    Country: { ID: 'CN', LocalizedName: 'China' },
    Key: "58491",
    LocalizedName: "Tongren",
    Rank: 13,
    Type: "City",
    Version: 1
  }, {
    AdministrativeArea: { ID: 'HE', LocalizedName: 'Hebei' },
    Country: { ID: 'CN', LocalizedName: 'China' },
    Key: "102324",
    LocalizedName: "Tangshan",
    Rank: 13,
    Type: "City",
    Version: 1
  }, {
    AdministrativeArea: { ID: 'JS', LocalizedName: 'Jiangsu' },
    Country: { ID: 'CN', LocalizedName: 'China' },
    Key: "59573",
    LocalizedName: "Taizhou",
    Rank: 13,
    Type: "City",
    Version: 1
  }, {
    AdministrativeArea: { ID: 'NM', LocalizedName: 'Inner Mongolia' },
    Country: { ID: 'CN', LocalizedName: 'China' },
    Key: "60198",
    LocalizedName: "Tongliao",
    Rank: 13,
    Type: "City",
    Version: 1
  }, {
    AdministrativeArea: { ID: 'SD', LocalizedName: 'Shandong' },
    Country: { ID: 'CN', LocalizedName: 'China' },
    Key: "106571",
    LocalizedName: "Tai'an",
    Rank: 13,
    Type: "City",
    Version: 1
  }, {
    AdministrativeArea: { ID: 'GS', LocalizedName: 'Gansu' },
    Country: { ID: 'CN', LocalizedName: 'China' },
    Key: "58055",
    LocalizedName: "Tianshui",
    Rank: 15,
    Type: "City",
    Version: 1
  }, {
    AdministrativeArea: { ID: 'ZJ', LocalizedName: 'Zhejiang' },
    Country: { ID: 'CN', LocalizedName: 'China' },
    Key: "2333653",
    LocalizedName: "Taizhou",
    Rank: 15,
    Type: "City",
    Version: 1
  }]
  
}

