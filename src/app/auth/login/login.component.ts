import { Component } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/compat/auth";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private fireAuth: AngularFireAuth) {
  }

  login(email: string , password: string){
    this.fireAuth.signInWithEmailAndPassword(email, password).then((da) => {
      console.log('works' + JSON.stringify(da))
    }, err => {
      console.log('something went wrong' + err)
    })
  }

  logout(){
    this.fireAuth.signOut().then(() => {
      console.log('signed out')
    }, err => {
      console.log('err' + err)
    })
  }

  test(){
    this.login('admin@mail.com', 'Password+123')
  }
}
