import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor() { }

  setLoading(state: boolean): void{
    this.loading$.next(state)
  }
}
