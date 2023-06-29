import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';
import {ControlInterface, FormInterface, Validation} from "../form-interface";
import {AbstractControl, FormBuilder, FormControl, FormControlOptions, FormGroup, Validators} from "@angular/forms";
import { checkControlError} from "../../shared/functions/form-validation-error";
import {AlertService} from "../../shared/service/alert.service";

@Component({
  selector: 'app-g-form',
  templateUrl: './g-form.component.html',
  styleUrls: ['./g-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GFormComponent implements OnInit, OnChanges{
  @Input() formData: FormInterface | null = null
  @Input() btnName: string  = 'Submit'
  @Input() formValue: any = null
  @Output() submit = new EventEmitter<any>()

  form: FormGroup = this.fb.group(this.generateFormGroup())

  constructor(private fb: FormBuilder, private alert: AlertService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form = this.generateFormGroup() as FormGroup
  }

  ngOnInit() {
    this.formData?.controls.sort((a, b) => a.order - b.order)
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
    let validator: any = _json?.validator
    _json?.controls.forEach((control: ControlInterface) => {
      if (!control.hasOwnProperty('dependentTo')){
        fb = {...fb,...this.createControl(control)}
      }
    })
    if (!validator){
      return this.fb.group(fb)
    }

   return this.fb.group(fb, {validators: validator.validate})
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

  controlError(name: string, error?: Validation): string{
    let control = this.form.get(name) as AbstractControl
    return checkControlError(control, error)
  }

  noFilter(){
    return true
  }

  onNext(){
    if (!this.form.valid){
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsDirty()
        this.form.controls[key].markAsTouched()
      })
      this.alert.sendAlert('Cannot submit invalid form !')
      return
    }
    this.submit.emit(this.form.value)
  }

  patchValue(){
    //for edit
  }
}
