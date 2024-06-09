import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'icon'
})
export class IconPipe implements PipeTransform {

  transform(value: number): string {
    let correctSrc: string = "" + value
    if (value < 10) {
      correctSrc = "0" + value
    }
    return `/assets/icons/weather-icons/${correctSrc}-s.png`
  }
}
