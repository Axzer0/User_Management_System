import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {concat, concatMap, defer, finalize, last, Observable, switchMap} from "rxjs";
import {FirestoreService} from "./firestore.service";
import {CurrentUserService} from "./current-user.service";

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private storage: AngularFireStorage, private currentUser: CurrentUserService) { }

  uploadFile(file: any ,filename: string): Observable<any> {
    let uid = this.currentUser.uid
    const filePath = `/${uid}/${filename}`; // Specify the path where you want to save the file in Firebase Storage
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Track the upload progress
    task.percentageChanges().subscribe(percentage => {
      // Update the progress bar or display the percentage
      console.log(`Upload progress: ${percentage}%`);
    });

    // Get the download URL of the uploaded file
    return concat(
      task.snapshotChanges(),
      fileRef.getDownloadURL()
    ).pipe(
      last()
    );
  }
}
