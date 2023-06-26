import { Component } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {validMatch} from "../../shared/functions/customValidators";
import {passwordPatternValidator} from "../passwordPatternValidation";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  validationObj: any = {
    email: {

    }
  }

  registerStatus: boolean = false;
  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: passwordPatternValidator,
    confirmPassword: ['', Validators.required],
  }, {validators: validMatch('password', 'confirmPassword')})

  constructor(private fb: FormBuilder) {
  }

  onSubmit(): void {
    console.log(this.registerForm.value)
    console.log(this.registerForm.valid)
  }

  control(controlName: string): AbstractControl | null{
    return this.registerForm.get(controlName)
  }

  catchValidationError = (errorType: string, control: AbstractControl): boolean =>{
    return control.hasError(errorType)
  }

  setError = (): string | null =>{
    return null;
  }
}
