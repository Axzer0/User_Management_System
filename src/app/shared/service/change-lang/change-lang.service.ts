import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChangeLangService {
  static lang: BehaviorSubject<string> = new BehaviorSubject<string>('en');


  constructor() { }

  public changeLang(value: string){
    ChangeLangService.lang.next(value)
  }
}
