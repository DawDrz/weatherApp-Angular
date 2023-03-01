import { Component } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent {
  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  pressure: number = 0;
  humidity: number = 0;
  summary: string = '';
  iconURL: string = '';
  city: string ='Minneapolis';
  units: string = 'imperial'


  constructor(private weatherService: WeatherService) {

  }
  ngOnInit(): void {
      this.weatherService.getweather(this.city, this.units).subscribe({

      next: (res) => {
        console.group(res)
        this.myWeather=res;
        console.log(this.myWeather);
        this.temperature=this.myWeather.main.temp;
        this.feelsLikeTemp=this.myWeather.main.feels_like;
        this.pressure=this.myWeather.main.pressure;
        this.humidity=this.myWeather.main.humidity;
        this.summary=this.myWeather.weather[0].main;

        this.iconURL = 'http://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '@2x.png';
      },

      error: (error) => console.log(error.message),
      complete: () => console.info('Api call completed')
    })
  }
}
