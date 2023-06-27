import { Injectable } from '@angular/core';
import {AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {CurrentUserService} from "./current-user.service";

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

  constructor(private afs: AngularFirestore, private currentUser: CurrentUserService) {
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

  updateUser(){
    this.afs.collection('user').doc('this').update({
      uid: 'that'
    }).then(() => {
      alert('updated')
    } )
  }

  getCollection(){
    //return collection
  }

}
