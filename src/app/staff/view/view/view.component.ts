import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {StaffService} from "../../service/staff.service";
import {UserService} from "../../../user/service/user.service";
import {LoadingService} from "../../../shared/service/loading.service";
import {AlertService} from "../../../shared/service/alert.service";
import {
  BasicDetailsInterface,
  ComplianceDetailsInterface,
  ContactDetailsInterface
} from "../../interface/staff-form-interface";
import {Observable, Subscription} from "rxjs";
import {EditDialogComponent} from "../../edit/edit-dialog/edit-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {BackEditForm} from "../../edit/EditForms";
import {StaffDetailsForm} from "../../../../assets/Forms/StaffDetailsForm";
import {StaffContactDetails} from "../../../../assets/Forms/StaffContactDetails";
import {CountryList, GenderList, LivingTerms} from "../../../../assets/Forms/optionList";

interface StaffRegistrationDetails{
  uid: string,
  basic:BasicDetailsInterface,
  contact?: ContactDetailsInterface,
  compliance?: ComplianceDetailsInterface
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


  constructor(private router: Router,
              public dialog: MatDialog,
              private staffDBService: StaffService,
              private userDBService: UserService,
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

  getStaffDetail(){
    this.staffSubscription = this.staffDBService.getStaffDetailById(this.uid).subscribe((res) => {
      this.loading.setLoading(false);
      if (res.length < 1){
        this.alert.sendAlert("No staff found with given id");
        return
      }
      this.staffDetails = {...res[0]}
      this.cdr.detectChanges()
      console.log(this.staffDetails)
    }, err => {
      this.loading.setLoading(false);
      this.alert.sendAlert("Failed to retrieve data !")
    })
  }

  onBack(){

  }

  onVerify(){

  }

  onEdit(key: string){
    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: key === 'basic' ? this.editBasicData() : this.editContactData() ,
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        console.log(result)
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe()
    this.staffSubscription.unsubscribe()
  }



  editBasicData(){
    let _value = {...this.staffDetails?.basic} as BasicDetailsInterface
    if (_value?.dob){
      _value.dob = new Date(_value.dob)
    }
    if (_value?.gender){
      if (this.mapGender(_value.gender) === 'others'){
        _value = Object.assign({}, _value, { other: _value?.gender });
        _value.gender = 'others'
      }
    }
    if (_value?.cob){
      _value.cob = this.mapCountry(_value.cob)
    }
    let _temp: any = {
      form: StaffDetailsForm,
      title: `Update Basic Details`,
      value: _value
    }
    return _temp
  }

  editContactData(){
    let _value = {...this.staffDetails?.contact} as ContactDetailsInterface
    if (_value?.country){
      _value.country = this.mapCountry(_value.country)
    }
    if (_value?.state){
      _value.state = this.mapCountry(_value.state)
    }
    if (_value?.city){
      _value.city = this.mapCountry(_value.city)
    }
    if (_value?.term){
      _value.term = this.mapTerm(_value.term)
    }
    let _temp: any = {
      form: StaffContactDetails,
      title: `Update Contact Details`,
      value:  _value
    }
    return _temp
  }

  mapGender(val: string): string{
    let _temp = GenderList.find(m => m.value == val)
    if (!_temp){
      return 'others'
    }
    return val
  }

  mapCountry(name: string): string{
    let _temp = CountryList.find(m => m.label == name)
    if (_temp){
      console.log(_temp)
      return _temp.value
    }
    return name
  }

  mapTerm(val: string): string{
    let _temp = LivingTerms.find(m => m.label == val)
    if (_temp){
      return _temp.value
    }
    return val
  }
}
