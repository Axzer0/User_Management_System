import { Injectable } from '@angular/core';
import {AngularFirestoreCollection, AngularFirestoreDocument, AngularFirestore} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class StaffService {

  collectionName: string = 'staff_details'
  staffCollection: AngularFirestoreCollection<any>;
  staff$: Observable<any>

  constructor(private afs: AngularFirestore) {
    this.staffCollection = this.afs.collection(this.collectionName)
    this.staff$ = this.staffCollection.valueChanges()
  }

  getStaff(){
    return this.staff$
  }


  getBasicDetails(){

  }

}
