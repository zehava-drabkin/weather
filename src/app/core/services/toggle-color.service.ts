import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleColorService {
  public color$ = new Subject<null>();

  constructor() { }

  toggleToDark() {
    this.color$.next(null);
  }
}
