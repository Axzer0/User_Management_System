import { Injectable } from '@angular/core';
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {finalize, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private storage: AngularFireStorage) { }

  uploadFile(file: any ): Observable<any> {
    const filePath = '/files/test'; // Specify the path where you want to save the file in Firebase Storage
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);

    // Get the download URL of the uploaded file
    return task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((downloadURL) => {
            console.log('File available at:', downloadURL);
            return downloadURL
            // Do something with the downloadURL (e.g., save it to a database)
          });
        })
      )
  }
}
