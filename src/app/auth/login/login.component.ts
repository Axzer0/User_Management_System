import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService, UserCredential} from "../services/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../shared/service/alert.service";
import {FirestoreService} from "../../shared/service/firestore.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  logInStatus: boolean = false;
  form: FormGroup = this.fb.group(
    {
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    }
  )

  constructor(private authService: AuthService,
              private userDBService: FirestoreService,
              private alert: AlertService,
              private router: Router,
              private fb: FormBuilder) {}

  login(): void{
    if (!this.form.valid){
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsDirty()
        this.form.controls[key].markAsTouched()
      })
      this.alert.sendAlert('Cannot submit invalid form !')
      return
    }
    this.logInStatus = true
    this.authService.login(this.form.value as UserCredential).then(async (da) => {
      this.logInStatus = false
      if (da) {
        let {uid, email} = JSON.parse(da)
        await this.userDBService.fetchCurrentUser(uid)
        this.router.navigate(['/dashboard']).then()
      } else {
        this.router.navigate(['/dashboard']).then()
      }
      console.log(da)
    }, err =>{
      this.loginError(err as string)
    })
  }

  loginError(err: string): void{
    console.log(err)
    this.logInStatus = false
    this.alert.sendAlert('Failed to login !')
  }

  get email(): AbstractControl {
    return this.form.get('email') as AbstractControl
  }

  get password():AbstractControl {
    return this.form.get('password') as AbstractControl
  }
}
