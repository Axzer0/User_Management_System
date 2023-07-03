import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StaffService} from "../../service/staff.service";
import {LoadingService} from "../../../shared/service/loading.service";
import {AlertService} from "../../../shared/service/alert.service";
import {
  BasicDetailsInterface,
  ComplianceDetailsInterface,
  ContactDetailsInterface
} from "../../interface/staff-form-interface";
import {finalize, Subscription} from "rxjs";
import {EditDialogComponent} from "../../edit/edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {StaffDetailsForm} from "../../../../assets/Forms/StaffDetailsForm";
import {StaffContactDetails} from "../../../../assets/Forms/StaffContactDetails";
import {MapCountry, MapGender, MapTerm} from "../../../shared/functions/helper-functions";
import {FirestorageService} from "../../../shared/service/firestorage.service";
import {UserService} from "../../../user/service/user.service";

export interface StaffRegistrationDetails{
  uid: string,
  basic: BasicDetailsInterface,
  contact?: ContactDetailsInterface,
  compliance?: ComplianceDetailsInterface | any
}

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit, OnDestroy{

  uid: string = ''
  staffDetails: StaffRegistrationDetails | null = null;
  paramsSubscription: Subscription = new Subscription();
  staffSubscription:  Subscription = new Subscription();
  user: any;


  constructor(private router: Router,
              public dialog: MatDialog,
              private staffDBService: StaffService,
              private userDBService: UserService,
              private storageService: FirestorageService,
              private loading: LoadingService,
              private alert: AlertService,
              private cdr: ChangeDetectorRef,
              private route: ActivatedRoute, ) {
  }


  ngOnInit(): void {
    this.loading.setLoading(true)
    this.paramsSubscription = this.route.params.subscribe((params) => {
      this.uid = params['id']
      if (this.uid){
        this.getStaffDetail()

      }
    })
  }

  getUserDetails(){
    this.userDBService.getUserDetailById(this.uid).subscribe(res => {
      this.loading.setLoading(false)
      this.user = {...res[0]}
    })
  }

  getStaffDetail(){
    this.staffSubscription = this.staffDBService.getStaffDetailById(this.uid).subscribe((res) => {
      if (res.length < 1){
        this.alert.sendAlert("No staff found with given id");
        return
      }
      this.staffDetails = {...res[0]}
      this.cdr.detectChanges()
      this.getUserDetails()
      console.log(this.staffDetails)
    }, err => {
      this.loading.setLoading(false);
      this.alert.sendAlert("Failed to retrieve data !")
    })
  }

  onEdit(key: string){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: key === 'basic' ? this.patchBasicData() : this.patchContactData() ,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        if (result.from === 'basic'){
          this.updateBasicDetails(result.data)
        }
        if (result.from === 'contact'){
          this.updateContactDetails(result.data)
        }
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe()
    this.staffSubscription.unsubscribe()
  }



  patchBasicData(){
    let _value = {...this.staffDetails?.basic} as BasicDetailsInterface
    if (_value?.dob){
      _value.dob = new Date(_value.dob)
    }
    if (_value?.gender){
      if (MapGender(_value.gender) === 'others'){
        _value = Object.assign({}, _value, { other: _value?.gender });
        _value.gender = 'others'
      }
    }
    if (_value?.cob){
      _value.cob = MapCountry(_value.cob)
    }
    let _temp: any = {
      form: StaffDetailsForm,
      title: `Update Basic Details`,
      value: _value,
      editFor: 'basic'
    }
    return _temp
  }

  patchContactData(){
    let _value = {...this.staffDetails?.contact} as ContactDetailsInterface
    if (_value?.country){
      _value.country = MapCountry(_value.country)
    }
    if (_value?.state){
      _value.state = MapCountry(_value.state)
    }
    if (_value?.city){
      _value.city = MapCountry(_value.city)
    }
    if (_value?.term){
      _value.term = MapTerm(_value.term)
    }
    let _temp: any = {
      form: StaffContactDetails,
      title: `Update Contact Details`,
      value:  _value,
      editFor: 'contact'
    }
    return _temp
  }

  updateBasicDetails(data: BasicDetailsInterface){
    if (data.gender === 'others'){
      data.gender = data?.other || ''
      delete data.other
    }
    if (data.dob){
      data.dob = data.dob.toLocaleString()
    }
    let _data = {
      ...this.staffDetails , basic: data
    } as StaffRegistrationDetails
    this.updateStaffDetails(_data)
  }

  updateContactDetails(data: ContactDetailsInterface){
    let _data = {
      ...this.staffDetails , contact: data
    } as StaffRegistrationDetails
    this.updateStaffDetails(_data)
  }

  updateComplianceDetails(fileDetails: any){
    this.loading.setLoading(true)
    let {from: key, data: file} = fileDetails
    if (key){
      if (this.staffDetails?.compliance?.[key]){
        this.storageService.deleteFile(this.staffDetails?.compliance?.[key].file)
          .pipe(
            finalize(() => {
              this.replaceFile(key, file)
            })
          )
          .subscribe()
      }
    }
  }

  replaceFile(key: string, file: any) {
    this.storageService.uploadFile(file[key].file, key)
      .pipe(
        finalize(() => {
          this.updateStaffDetails(this.staffDetails)
        })
      )
      .subscribe(
      (url: any) =>{
        if (url){
          if (this.staffDetails?.compliance?.[key]) {
            if ("compliance" in this.staffDetails) {
              this.staffDetails.compliance[key].file = url
              this.staffDetails.compliance[key].type = file[key].type
            }
          }
        }
      }
    )
  }

  updateStaffDetails(data: any){
    this.loading.setLoading(true)
    this.staffDBService.updateStaffRegistrationDetailsById(this.uid, data).then(res => {
        this.loading.setLoading(false)
        this.router.navigate(['/staff']).then(() => this.alert.sendAlert('Staff detail updated'))
      },err => {
        this.loading.setLoading(false)
        this.alert.sendAlert('Failed to update details !')
      }
    )
  }

  onVerify(){
    let _user = {...this.user, isVerified: true}
    this.userDBService.updateVerifiedStatus(this.uid, _user).then(() => {
      this.loading.setLoading(false)
      this.router.navigate(['/staff']).then(() => {this.alert.sendAlert('User Verified')})
    }, err => {
      this.loading.setLoading(false)
      this.alert.sendAlert('Failed to verify user')
    })
  }
}
