import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {finalize, Observable} from "rxjs";
import {CurrentUserService} from "../../shared/service/current-user.service";
import {UserModal} from "../../shared/service/firestore.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userCollection: AngularFirestoreCollection<any>;
  private readonly userList$: Observable<any>

  collectionName: string = 'user'

  constructor(private afs: AngularFirestore,
              private currentUser: CurrentUserService) {
    this.userCollection = this.afs.collection('user')
    this.userList$ = this.userCollection.valueChanges()
  }

  userList(){
    return this.userList$
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

  updateVerifiedStatus(uid: string, user: any): Promise<void>{
    return this.updateUser(uid, user)
  }

  getUserDetailById(uid: string): Observable<any>{
    return this.afs.collection(this.collectionName, ref => {
      return ref.where('uid', '==', uid)
    }).valueChanges()
  }
}
