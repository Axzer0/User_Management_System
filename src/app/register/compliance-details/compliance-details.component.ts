import {Component, EventEmitter, Output} from '@angular/core';
import {FormInterface} from "../../generic-form/form-interface";
import {StaffComplianceDetails} from "../../../assets/Forms/StaffComplianceDetails";
import {StaffService} from "../../staff/service/staff.service";
import {FirestorageService} from "../../shared/service/firestorage.service";
import {finalize} from "rxjs";
import {ComplianceDetailsInterface} from "../../staff/interface/staff-form-interface";
import {AlertService} from "../../shared/service/alert.service";
import {LoadingService} from "../../shared/service/loading.service";

@Component({
  selector: 'app-compliance-details',
  templateUrl: './compliance-details.component.html',
  styleUrls: ['./compliance-details.component.scss']
})
export class ComplianceDetailsComponent {
  form: FormInterface = StaffComplianceDetails

  residence$: any;
  cv$: any;
  certification$: any;
  front$: any;
  back$: any;
  passport$: any;
  address$: any;

  formData: ComplianceDetailsInterface | null = null
  @Output() next: EventEmitter<any> = new EventEmitter<any>()
  constructor( private staffDBService: StaffService, private fs: FirestorageService,
               public alert: AlertService,
               private loading: LoadingService,) {
  }

  onSubmit(data: ComplianceDetailsInterface){
    this.loading.setLoading(true)
    if (data){
      this.formData = data

      //start the chain of uploads
      this.upLoadCertification()
    } else {
      this.loading.setLoading(true)
    }
  }

  /* upload confirmed inputs then conditional
  * -> 1st upload certification
  * -> 2nd upload CV
  * -> 3rd upload address
  * -> if passport, upload passport then
  *    -> if residence upload residence else
  *    -> upload data to db
  * -> if other , 1st  upload front then
  *               2nd upload back
  *               -> if residence upload residence else
  *               -> upload data to db
  * */

  upLoadCertification(){
    this.certification$ = this.fs.uploadFile(this.formData?.certification.file, 'certification')
    this.certification$
      .pipe(
      finalize(() => {
        this.upLoadAddress()
      })
      )
      .subscribe((url: any) => {
        if (url){
          if (this.formData?.certification) {
            this.formData.certification.file = url
          }
        }
      })
  }

  upLoadAddress(){
    this.address$ = this.fs.uploadFile(this.formData?.address.file, 'address')
    this.address$
      .pipe(
        finalize(() => {
          this.uploadCV()
        })
      )
      .subscribe((url: any) => {
        if (url){
          if (this.formData?.address) {
            this.formData.address.file = url
          }
        }
      })
  }
  uploadCV(){
    this.cv$ = this.fs.uploadFile(this.formData?.cv.file, 'cv')
    this.cv$
      .pipe(
        finalize(() => {
          if (this.formData?.passport){
            this.uploadPassport()
          }
          if (this.formData?.front){
            this.uploadFront()
          }
        })
      )
      .subscribe((url: any) => {
        if (url){
          if (this.formData?.cv) {
            this.formData.cv.file = url
          }
        }
      })

  }


  uploadPassport(){
    this.passport$ = this.fs.uploadFile(this.formData?.passport?.file, 'passport')
    this.passport$
      .pipe(
        finalize(() =>{
          if (this.formData?.residence){
            this.uploadResidence()
          } else {
            this.submitComplianceDetails()
          }
        })
      )
      .subscribe((url: any) =>{
        if (url){
          if (this.formData?.passport) {
            this.formData.passport.file = url
          }
        }
      })
  }

  uploadFront(){
    this.front$ = this.fs.uploadFile(this.formData?.front?.file, 'front')
    this.front$
      .pipe(
        finalize(() =>{
        this.uploadBack()
      }))
      .subscribe((url: any) =>{
        if (url){
          if (this.formData?.front) {
            this.formData.front.file = url
          }
        }
      })
  }

  uploadBack(){
    this.back$ = this.fs.uploadFile(this.formData?.back?.file, 'back')
    this.back$
      .pipe(
        finalize(() =>{
          if (this.formData?.residence){
            this.uploadResidence()
          } else {
            this.submitComplianceDetails()
          }
        })
      )
      .subscribe((url: any) =>{
        if (url){
          if (this.formData?.back) {
            this.formData.back.file = url
          }
        }
      })
  }

  uploadResidence(){
    this.residence$ = this.fs.uploadFile(this.formData?.residence?.file, 'residence')
    this.residence$
      .pipe(
        finalize(() => {
          this.submitComplianceDetails()
        })
      )
      .subscribe((url: any) =>{
        if (url){
          if (this.formData?.residence) {
            this.formData.residence.file = url
          }
        }
      })
  }

  submitComplianceDetails(){
    console.log('in end')
    console.log(this.formData)
    this.staffDBService.submitComplianceDetails(this.formData as ComplianceDetailsInterface).then((res) =>{
      this.alert.sendAlert('Compliance details Added')
      this.loading.setLoading(false)
      this.next.emit(4)
    }, err => {
      this.alert.sendAlert('Something went wrong !')
      this.loading.setLoading(false)
    })
  }
}
