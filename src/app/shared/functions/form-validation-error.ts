import {AbstractControl} from "@angular/forms";

const catchValidationError = (errorType: string, control: AbstractControl): boolean =>{
  return control.hasError(errorType)
}

const setError = (): string | null =>{
  return null;
}
