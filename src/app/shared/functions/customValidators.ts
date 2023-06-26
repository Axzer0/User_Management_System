import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {patternMap} from "../../auth/passwordPatternValidation";


export const patternValidator = ({regex, error }: patternMap): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value){
      return null;
    }

    const valid = regex.test(control.value)
    return valid ? null : error
  }
}

export const validMatch = (targetKey: string, toMatchKey: string): ValidatorFn => {
  return (control: AbstractControl): ValidationErrors | null => {
    const target = control.get(targetKey);
    const toMatch = control.get(toMatchKey);
    if (target && toMatch && (target?.value !== toMatch?.value)) {
      return {
        matchError: true
      }
    }
    return null;
  };
}
