import {ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

export interface ControlInterface{
  controlName: string,
  order: number,
  type: string,
  name: string,
  label: string,
  placeholder?: string,
  class?: string
  options?: Array<string>,
  dependentTo?: {
    value: string,
    trigger: any
  },
  filter?: any,
  validation?: Validation
}

export interface FormInterface{
  controls: Array<ControlInterface>,
  validator?: any
}

export interface Validation{
  required?: string,
  min?: number,
  max?: number,
  email?: boolean,
  matDatepickerFilter?: string
  match?: string
}
