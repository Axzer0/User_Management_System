import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validMatch} from "../../shared/functions/customValidators";
import {passwordPatternValidator} from "../passwordPatternValidation";
import {AuthService, UserCredential} from "../services/auth.service";
import {AlertService} from "../../shared/service/alert.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  showPassword: boolean = false
  showCPassword: boolean = false

  registerStatus: boolean = false;
  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', passwordPatternValidator],
    confirmPassword: ['', Validators.required],
  }, {validators: [validMatch('password', 'confirmPassword')]})

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private alert: AlertService) {}

  onSubmit(): void {
    if (!this.registerForm.valid){
      Object.keys(this.registerForm.controls).forEach(key => {
        this.registerForm.controls[key].markAsTouched()
        this.registerForm.controls[key].markAsDirty()
      })
      this.alert.sendAlert('Cannot submit Invalid form !')
      return
    }
    this.registerStatus = true
    let user: UserCredential = {
      email: this.email.value,
      password: this.password.value
    }
    this.authService.registerUser(user).then((res) => {
      this.registerStatus = false
      this.alert.sendAlert('Sign-in successful. You can now login.')
      this.router.navigate(['/login']).then()
    } , err => {
      this.registerStatus = false
      this.alert.sendAlert('Something went wrong !')
    })
  }


  get password(): AbstractControl{
    return this.registerForm.get('password') as AbstractControl
  }
  get email(): AbstractControl{
    return this.registerForm.get('email') as AbstractControl
  }

  get cPassword(): AbstractControl{
    return this.registerForm.get('confirmPassword') as AbstractControl
  }

  catchValidationError = (errorType: string, control: AbstractControl): boolean =>{
    return control.hasError(errorType)
  }

  hasCapitalError(): boolean{
    return this.password?.errors?.['required'] || this.catchValidationError('hasCapitalCase', this.password)
  }

  hasNumberError(): boolean{
    return this.password?.errors?.['required'] || this.catchValidationError('hasNumber', this.password)
  }

  hasSpecialCharError(): boolean{
    return this.password?.errors?.['required'] || this.catchValidationError('hasSpecialCharacter', this.password)
  }

  hasMatchError(): boolean{
    return this.password?.errors?.['required'] || this.registerForm.errors?.['matchError']
  }

  toggle(v: string): void{
    if (v == 'p'){
      this.showPassword = !this.showPassword
    }
    if (v == 'cp'){
      this.showCPassword = !this.showCPassword
    }
  }
}
