import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  static alert: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

  sendAlert(message: string){
    AlertService.alert.next(message)
  }
}
