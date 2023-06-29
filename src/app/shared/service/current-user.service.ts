import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {UserModal} from "./firestore.service";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  currentUser$ = new BehaviorSubject<UserModal | null>(null)

  constructor() { }

  setCurrentUser(_user: UserModal): void{
    console.log(_user)
    this.currentUser$.next(_user)
  }

  get currentUser(): BehaviorSubject<UserModal | null>{
    return this.currentUser$
  }

  get uid(): string{
    let {uid} = JSON.parse(localStorage.getItem('user') || "{}")
    return uid
  }
}
