import { Injectable } from '@angular/core';
import {AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable, Subscription} from "rxjs";
import {UserModal} from "../../shared/service/firestore.service";
import {CurrentUserService} from "../../shared/service/current-user.service";
import {BasicDetailsInterface, ContactDetailsInterface} from "../interface/staff-form-interface";


@Injectable({
  providedIn: 'root'
})
export class StaffService {

  collectionName: string = 'staff_details'
  staffCollection: AngularFirestoreCollection<any>;
  staffList$: Observable<any>
  staffDetailDoc: AngularFirestoreDocument<any>;
  staff$: Observable<any>
  registrationDetails: any

  constructor(private afs: AngularFirestore, private currentUser: CurrentUserService) {
    this.staffCollection = this.afs.collection(this.collectionName)
    this.staffList$ = this.staffCollection.valueChanges()
    this.staffDetailDoc = this.staffCollection.doc(this.currentUser.uid)
    this.staff$ = this.staffCollection.doc(this.currentUser.uid).valueChanges()
    this.getRegistrationDetails()
  }

  getStaff(){
    return this.staffList$
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

  submitContactDetails(_data: ContactDetailsInterface): Promise<string | void>{
    let data: any;
    if (this.registrationDetails){
      data = {
        ...this.registrationDetails, contact: _data
      }
    }
    return this.staffDetailDoc.update(data).then((res) => {
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

  getRegistrationDetails(){
    this.staff$.subscribe(currentData =>{
      this.registrationDetails = currentData
      console.log(this.registrationDetails)
    })
  }
}
