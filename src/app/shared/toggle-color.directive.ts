import { Directive, ElementRef, Input } from '@angular/core';
import { ToggleColorService } from '../core/services/toggle-color.service';

@Directive({
  selector: '[appToggleColor]'
})
export class ToggleColorDirective {

  constructor(private element: ElementRef, private _toggleColorService: ToggleColorService) {
    _toggleColorService.color$?.subscribe(() => {
      if (this.element.nativeElement.classList.contains('light')) {
        this.element.nativeElement.classList.remove('light')
        this.element.nativeElement.classList.add('dark')
      }
      else {
        this.element.nativeElement.classList.remove('dark')
        this.element.nativeElement.classList.add('light')
      }
    })
  }
}
