import {ValidationErrors, Validators} from "@angular/forms";
import {patternValidator} from "../shared/functions/customValidators";

export interface patternMap{
  regex: RegExp,
  error: ValidationErrors
}

const hasNumber: patternMap = {
  regex: /\d/,
  error: {
    hasNumber: true
  }
}
const hasCapitalCase: patternMap = {
  regex: /[A-Z]/,
  error: {
    hasCapitalCase: true
  }
}
const hasSpecialCharacter: patternMap = {
  regex: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/? ]/,
  error: {
    hasSpecialCharacter: true
  }
}

export const passwordPatternValidator =   [Validators.required,
    patternValidator(hasNumber),
    patternValidator(hasCapitalCase),
    patternValidator(hasSpecialCharacter),
    Validators.minLength(8)]
