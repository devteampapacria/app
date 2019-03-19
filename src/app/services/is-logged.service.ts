import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IsLoggedService {

  constructor() { }

  public onLogginChange: BehaviorSubject<boolean> = new BehaviorSubject(false);

  check() {
    if (localStorage.getItem('key')) {
      return JSON.parse(localStorage.getItem('key'));
    } else {
      return null;
    }
  }

  public listenToLoggin(): void {
    this.onLogginChange.next(this.check());
  } 
}
