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

  onEdit(){
    console.log('in ')
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe()
    this.staffSubscription.unsubscribe()
  }
}
