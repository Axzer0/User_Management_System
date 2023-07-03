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
import {FirestorageService} from "../../shared/service/firestorage.service";


@Component({
  selector: 'app-g-form',
  templateUrl: './g-form.component.html',
  styleUrls: ['./g-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GFormComponent implements OnInit, OnChanges{
  @Input() formData: FormInterface | null = null
  @Input() btnName: string  = 'Submit'
  @Input() formValue: any = null;
  @Output() submit = new EventEmitter<any>()


  form: FormGroup = this.fb.group(this.generateFormGroup())

  emitData: any = null

  constructor(private fb: FormBuilder, private alert: AlertService, private upload: FirestorageService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.form = this.generateFormGroup() as FormGroup
    if (this.formValue){
      this.patchValue()
    }
  }

  ngOnInit() {
    this.formData?.controls.sort((a, b) => a.order - b.order)
  }

  // create a reactive form group based on JSON input
  generateFormGroup(): Object{
    if (this.formData){
      return this.convertJSONtoForm(this.formData)
    }
    return {}
  }

  // loop through the json and create a fb object
  // if a field is dependent to another then -> Do not add to form group
  convertJSONtoForm(_json: FormInterface){
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

  // convert and return a single control
  createControl(_control: ControlInterface){
    return {[_control.controlName]: [  null, this.generateValidator(_control.validation || {})]}
  }


  // check to display field or not
  displayField(control: any){
    // display if field is not dependent
    if (!control.hasOwnProperty('dependentTo')){
      return true
    }

    // get the trigger value and compare its state (true / false) and display if trigger conditions is met
    // value is which field current field depends on and trigger is the conditions to show the field
    let {value, trigger} = control?.dependentTo
    if (trigger(this.form.get(value)?.value)){
      this.form.addControl(control.controlName,
        new FormControl(null, this.generateValidator(control.validation || {}) as FormControlOptions)
      )
      if (this.formValue && (this.form.get(control.controlName)?.value === null)){
        this.patchDependentValue(control.controlName)
      }
    } else {
      this.form.removeControl(control.controlName)
    }
    return trigger(this.form.get(value)?.value)
  }


  //generates validation based on inputs provided
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

  //checks for error
  controlError(name: string, error?: Validation): string{
    let control = this.form.get(name) as AbstractControl
    return checkControlError(control, error)
  }

  noFilter(){
    return true
  }



  // for file selection
  onFileSelected(event: any, control: any, maxFileSize: any) {
    console.log(this.form.value)
    const selectedFile = event.target.files[0];
    const fileSize = selectedFile.size;
    if (maxFileSize){
      maxFileSize = maxFileSize  * 1024 * 1024
    }
    if (fileSize > maxFileSize) {
      this.alert.sendAlert('File size exceeds the limit. Please select a smaller file.');
      this.form.patchValue({
        [control]: null
      })
      return;
    }

    this.emitData = {
      ...this.emitData, [control]: {
        file: selectedFile,
        type: this.getExtension(selectedFile.name)
      }
    }

    // this.upload.uploadFile(selectedFile).subscribe((da) => {
    //   console.log(da)
    // })

    // Proceed with file handling
    // ...
  }

  getExtension(filename: string) {
    let parts = filename.split('.');
    return parts[parts.length - 1];
  }

  //generate object to be emitted
  generateEmitObject(){
    if (!this.emitData){
      return this.form.value
    }
    let _temp: any = {}
    console.log(this.emitData)
    Object.keys(this.form.value).forEach(formKey => {
      Object.keys(this.emitData).forEach(fileKey => {
        if (formKey !== fileKey){
          _temp = {..._temp, [formKey]: this.form.value[formKey]}
        }
      })
    })
    return {..._temp, ...this.emitData}
  }

  // emit the data for submission
  onEmit(){
    if (!this.form.valid){
      Object.keys(this.form.controls).forEach(key => {
        this.form.controls[key].markAsDirty()
        this.form.controls[key].markAsTouched()
      })
      this.alert.sendAlert('Cannot submit invalid form !')
      return
    }
    this.submit.emit(this.generateEmitObject())
  }

  patchValue(){
    console.log(this.formValue)
    this.form.patchValue(this.formValue)
  }

  patchDependentValue(name: string){
    this.form.get(name)?.patchValue(this.formValue[name])
  }
}
