import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ControlInterface, FormInterface, Validation} from "../form-interface";
import {FormBuilder, FormControl, FormControlOptions, FormGroup, Validators} from "@angular/forms";
import {catchValidationError} from "../../shared/functions/form-validation-error";
import {patternValidator} from "../../shared/functions/customValidators";

@Component({
  selector: 'app-g-form',
  templateUrl: './g-form.component.html',
  styleUrls: ['./g-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GFormComponent implements OnInit, OnChanges{
  @Input() formData: FormInterface | null = null

  form: FormGroup = this.fb.group(this.generateFormGroup())

  constructor(private fb: FormBuilder) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form = this.fb.group(this.generateFormGroup())
  }

  ngOnInit() {
    console.log(this.form)
  }

  generateFormGroup(): Object{
    if (this.formData){
      return this.convertJSONtoForm(this.formData)
    }
    return {}
  }

  convertJSONtoForm(_json: FormInterface){
    //loop through the json and create a fb object
    let fb: any = {}
    _json?.controls.forEach((control: ControlInterface) => {
      if (!control.hasOwnProperty('dependentTo')){
        fb = {...fb,...this.createControl(control)}
      }
    })
   return fb
  }

  createControl(_control: ControlInterface){
    //convert and return a single control
    return {[_control.controlName]: [null, this.generateValidator(_control.validation || {})]}
  }

  checkDependency(control: any){
    if (!control.hasOwnProperty('dependentTo')){
      return true
    }
    let {value, trigger} = control?.dependentTo
    if (trigger(this.form.get(value)?.value)){
      this.form.addControl(control.controlName,
        new FormControl(null, this.generateValidator(control.validation || {}) as FormControlOptions)
      )
    } else {
      this.form.removeControl(control.controlName)
    }
    return trigger(this.form.get(value)?.value)
  }

  generateValidator(_validate: Validation):Array<Validators> {
    let validators: Array<Validators> = []
    if (_validate?.required){
     validators.push(Validators.required)
    }
    if (_validate?.max){
      validators.push(Validators.maxLength(_validate?.max as number))
    }
    if (_validate?.min){
      validators.push(Validators.minLength(_validate?.min as number))
    }
    if (_validate?.email){
      validators.push(Validators.email)
    }
    return validators
  }

  checkControlError(name: string, error?: Validation): string{
    let control = this.form.get(name)
    if (control?.invalid && (control?.dirty || control?.touched)){
      if (!error){
        return 'Error type not detected '
      }
      return  catchValidationError(error ,control)
    } else {
      return ''
    }
  }

  noFilter(){
    return true
  }
}
