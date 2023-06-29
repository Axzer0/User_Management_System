import { Injectable } from '@angular/core';
import {AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import {UserModal} from "../../shared/service/firestore.service";
import {CurrentUserService} from "../../shared/service/current-user.service";
import {BasicDetailsInterface} from "../interface/staff-form-interface";


@Injectable({
  providedIn: 'root'
})
export class StaffService {

  collectionName: string = 'staff_details'
  staffCollection: AngularFirestoreCollection<any>;
  staff$: Observable<any>

  constructor(private afs: AngularFirestore, private currentUser: CurrentUserService) {
    this.staffCollection = this.afs.collection(this.collectionName)
    this.staff$ = this.staffCollection.valueChanges()
  }

  getStaff(){
    return this.staff$
  }


  getBasicDetails(){

  }

  submitBasicDetails(_data: BasicDetailsInterface): Promise<string | void>{
    let uid = this.currentUser.uid
    let data = {
      basic: _data,
      uid
    }
    return this.staffCollection.doc(uid).set(data).then((res) => {
      return (res)
    }, err => {
      throw Error(err)
    })
  }

  getCurrentUserRegistrationDetails(){
    let uid = this.currentUser.uid
    return this.afs.collection(this.collectionName, ref => {
      return ref.where('uid', '==', uid)
    }).valueChanges()
  }
}
