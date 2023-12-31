import { Injectable } from '@angular/core';
import {AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore} from "@angular/fire/compat/firestore";
import {BehaviorSubject, Observable} from "rxjs";
import {CurrentUserService} from "./current-user.service";
import {update} from "@angular/fire/database";
import {LoadingService} from "./loading.service";

export interface UserModal{
  uid: string,
  username: string,
  email: string,
  isVerified: boolean,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  userCollection: AngularFirestoreCollection<any>;
  user: Observable<any>

  constructor(private afs: AngularFirestore,
              private currentUser: CurrentUserService,
              private loading: LoadingService) {
    this.userCollection = this.afs.collection('user')
    this.user = this.userCollection.valueChanges()
  }

  userList(){
    return this.user
  }

  addUser({uid , email}: {uid: string, email: string}): Promise<string | void>{
    let _user: UserModal = {
      uid, email, role: 'user', isVerified: false, username: ''
    }
    return this.userCollection.doc(uid).set(_user).then((res) => {
      console.log('User Added to collection user')
      return (res)
    }, err => {
      console.log('failed to create user')
      throw Error(err)
    })
  }

  fetchCurrentUser(uid: string){
    return this.afs.collection('user', ref => {
      return ref.where('uid', '==', uid)
    }).get().subscribe((snapshot) => {
      let data = snapshot.docs.map((doc) =>  doc.data())
      this.currentUser.setCurrentUser(data[0] as UserModal)
    })
  }

  deleteUser(){
    this.afs.collection('user').doc('this').delete().then(() => {
      alert('deleted')
    })
  }

  updateUser(uid: string, data: any){
    return this.afs.collection('user').doc(uid).update(data)
  }

  updateVerifiedStatus(): Promise<void>{
    let current = this.currentUser.currentUser.getValue()
    let uid = this.currentUser.uid
    if (current){
      current = {
        ...current, isVerified: true
      }
    }
    return this.updateUser(uid, current)
  }

  getCollection(){
    //return collection
  }

}
