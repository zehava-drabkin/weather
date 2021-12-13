import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CurrentWeather } from 'src/app/shared/models/currentWeather.model';
import { Forecast } from 'src/app/shared/models/forecast.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  isMetric = true;
  CURRENT_WEATHER:CurrentWeather={
    LocalObservationDateTime: "2021-12-12T02:53:00+09:00",
    EpochTime: 1639245180,
    WeatherText: "Mostly cloudy",
    WeatherIcon: 38,
    HasPrecipitation: false,
    PrecipitationType: null,
    PrecipitationIntensity: null,
    IsDayTime: false,
    Temperature: {
      Metric: {
        Value: 8.8,
        Unit: "C",
        UnitType: 17
      },
      Imperial: {
        Value: 48,
        Unit: "F",
        UnitType: 18
      },
    },
    MobileLink: "http://www.accuweather.com/en/jp/tokyo/226396/current-weather/226396?lang=en-us",
    Link: "http://www.accuweather.com/en/jp/tokyo/226396/current-weather/226396?lang=en-us",
  }
  getCURRENT_WEATHER():CurrentWeather
  {
    return this.CURRENT_WEATHER;
  }
  FORECAST:Forecast=
    {"Headline":{"EffectiveDate":"2021-12-14T07:00:00+09:00","EffectiveEpochDate":1639432800,"Severity":5,"Text":"Expect showers Tuesday","Category":"rain","EndDate":"2021-12-14T19:00:00+09:00","EndEpochDate":1639476000,"MobileLink":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?unit=c&lang=en-us","Link":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?unit=c&lang=en-us"},"DailyForecasts":[{"Date":"2021-12-12T07:00:00+09:00","EpochDate":1639260000,"Temperature":{"Minimum":{"Value":8.1,"Unit":"C","UnitType":17},"Maximum":{"Value":17.1,"Unit":"C","UnitType":17}},"Day":{"Icon":3,"IconPhrase":"Partly sunny","HasPrecipitation":false},"Night":{"Icon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=1&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=1&unit=c&lang=en-us"},{"Date":"2021-12-13T07:00:00+09:00","EpochDate":1639346400,"Temperature":{"Minimum":{"Value":4.6,"Unit":"C","UnitType":17},"Maximum":{"Value":12.8,"Unit":"C","UnitType":17}},"Day":{"Icon":2,"IconPhrase":"Mostly sunny","HasPrecipitation":false},"Night":{"Icon":33,"IconPhrase":"Clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=2&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=2&unit=c&lang=en-us"},{"Date":"2021-12-14T07:00:00+09:00","EpochDate":1639432800,"Temperature":{"Minimum":{"Value":4.6,"Unit":"C","UnitType":17},"Maximum":{"Value":10,"Unit":"C","UnitType":17}},"Day":{"Icon":12,"IconPhrase":"Showers","HasPrecipitation":true,"PrecipitationType":"Rain","PrecipitationIntensity":"Light"},"Night":{"Icon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=3&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=3&unit=c&lang=en-us"},{"Date":"2021-12-15T07:00:00+09:00","EpochDate":1639519200,"Temperature":{"Minimum":{"Value":5.9,"Unit":"C","UnitType":17},"Maximum":{"Value":13.7,"Unit":"C","UnitType":17}},"Day":{"Icon":1,"IconPhrase":"Sunny","HasPrecipitation":false},"Night":{"Icon":34,"IconPhrase":"Mostly clear","HasPrecipitation":false},"Sources":["AccuWeather"],"MobileLink":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=4&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=4&unit=c&lang=en-us"},{"Date":"2021-12-16T07:00:00+09:00","EpochDate":1639605600,"Temperature":{"Minimum":{"Value":10.3,"Unit":"C","UnitType":17},"Maximum":{"Value":14.9,"Unit":"C","UnitType":17}},"Day":{"Icon":6,"IconPhrase":"Mostly cloudy","HasPrecipitation":false},"Night":{"Icon":12,"IconPhrase":"Showers","HasPrecipitation":true,"PrecipitationType":"Rain","PrecipitationIntensity":"Light"},"Sources":["AccuWeather"],"MobileLink":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=5&unit=c&lang=en-us","Link":"http://www.accuweather.com/en/jp/tokyo/226396/daily-weather-forecast/226396?day=5&unit=c&lang=en-us"}]}
  getFORECAST()
  {
    return this.FORECAST;
  }
  temperatureUnitChanged = new Subject<null>();

  constructor(private httpClient: HttpClient) {}

  getForecast(locationKey: string): Observable<Forecast> {
    const isMetric = this.isMetric ? 'true' : 'false';

    let params: HttpParams = new HttpParams();
    params = params.append('apikey', environment.apiKey);
    params = params.append('metric', isMetric);

    return this.httpClient.get<Forecast>(`http://dataservice.accuweather.com/forecasts/v1/daily/5day/${locationKey}`, { params });
  }
 

  getCurrentWeather(locationKey: string): Observable<CurrentWeather> {
    let params: HttpParams = new HttpParams();
    params = params.append('apikey', environment.apiKey);

    return this.httpClient.get<CurrentWeather>(`http://dataservice.accuweather.com/currentconditions/v1/${locationKey}`, { params });
  }


}
