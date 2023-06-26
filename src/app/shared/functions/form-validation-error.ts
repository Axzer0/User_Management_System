import {AbstractControl} from "@angular/forms";
import {Validation} from "../../generic-form/form-interface";

export const catchValidationError = (errorType: Validation, control: AbstractControl): string =>{
  if (errorType?.required && control.errors?.['required']){
    return requiredError(errorType?.required)
  }
  if (errorType?.max && control.errors?.['maxlength']){
    return maxError(errorType.max)
  }
  if (errorType?.min && control.errors?.['minlength']){
    return minError(errorType.min)
  }
  if (errorType?.email && control.errors?.['email']){
    return emailError()
  }
  if (errorType?.matDatepickerFilter && control.errors?.['matDatepickerFilter']){
    return errorType.matDatepickerFilter
  }
  return ''
}

const requiredError = (val: string = 'Field'): string => {
  return (val + ' is required')
}

const minError = (val: number): string => {
  return (`Minimum ${val} characters required`)
}

const maxError = (val: number): string => {
  return (`Exceeded max character count of ${val}`)
}

const emailError = (): string => {
  return ('Invalid email syntax')
}

