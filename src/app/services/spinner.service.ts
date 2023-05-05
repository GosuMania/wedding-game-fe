import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private count = 0;
  private spinner$ = new BehaviorSubject<string>('');
  private spinnerApi$ = new BehaviorSubject<string>('');

  constructor() { }

  getSpinnerObserver(): Observable<string> {
    return this.spinner$.asObservable();
  }

  requestStarted() {
    if (++this.count === 1) {
      this.spinner$.next('start');
    }
  }

  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.spinner$.next('stop');
    }
  }

  resetSpinner() {
    this.count = 0;
    this.spinner$.next('stop');
  }

  getSpinnerObserverApi(): Observable<string> {
    return this.spinnerApi$.asObservable();
  }

  requestStartedApi() {
    if (++this.count === 1) {
      this.spinnerApi$.next('start');
    }
  }

  requestEndedApi() {
    if (this.count === 0 || --this.count === 0) {
      this.spinnerApi$.next('stop');
    }
  }

  resetSpinnerApi() {
    this.count = 0;
    this.spinnerApi$.next('stop');
  }
}
