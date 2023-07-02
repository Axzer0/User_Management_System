import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {FirestoreService} from "../../shared/service/firestore.service";

export interface UserCredential{
  email: string, password: string
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireAuth: AngularFireAuth, private router: Router, private userDBService: FirestoreService) {
  }

  login({email , password}: UserCredential): Promise<string | void>{
    return this.fireAuth.signInWithEmailAndPassword(email, password).then((da) => {
      let _user = {
        uid: da.user?.uid,
        email: da.user?.email
      }
      localStorage.setItem('user', JSON.stringify(_user))
      localStorage.setItem('token', `${da.user?.uid}+token+${da.user?.email}`)
      return JSON.stringify(_user)
    }, err => {
      throw Error(err)
    })
  }

  registerUser({email , password}: UserCredential): Promise<string | void>{
    return this.fireAuth.createUserWithEmailAndPassword(email, password).then(res => {
      let {uid, email} = res?.user as any
      this.userDBService.addUser({uid, email}).then(() => {
        return {
          status: "success"
        }
      }, err => {
        throw Error(err)
      })
    }, err => {
      throw Error(err)
    })
  }

  logout(){
    this.fireAuth.signOut().then(() => {
      localStorage.clear()
      window.location.reload();
    }, err => {
      console.log('err' + err)
    })
  }
}
