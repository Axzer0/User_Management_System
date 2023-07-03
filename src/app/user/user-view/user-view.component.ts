import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {StaffService} from "../../staff/service/staff.service";
import {UserService} from "../service/user.service";
import {LoadingService} from "../../shared/service/loading.service";
import {AlertService} from "../../shared/service/alert.service";
import {Subscription} from "rxjs";

interface UserListObjectInterface{
  uid: string,
  username: string,
  role: string,
  isVerified: string,
  email: string
}

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit, OnDestroy{


  uid: string = ''
  userDetails: UserListObjectInterface | null = null;
  paramsSubscription: Subscription = new Subscription();
  userSubscription:  Subscription = new Subscription();
  editMode: boolean = false
  userName: string = ''

  constructor(private router: Router,
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
        this.getUserDetails()
      }
    })
  }

  getUserDetails(){
    this.userSubscription = this.userDBService.getUserDetailById(this.uid).subscribe((res) => {
      this.loading.setLoading(false);
      if (res.length < 1){
        this.alert.sendAlert("No user found with given id");
        return
      }
      this.userDetails = {...res[0]}
      this.userName = this.userDetails?.username || ''
      this.cdr.detectChanges()
    }, err => {
      this.loading.setLoading(false);
      this.alert.sendAlert("Failed to retrieve data !")
    })
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe()
    this.userSubscription.unsubscribe()
  }

  onEdit(){
    this.editMode = true
  }

  onUpdate(){
    if (!this.userName){
      this.alert.sendAlert('Username cannot be empty !')
      return
    }
    this.loading.setLoading(true)
    let _data = {...this.userDetails, username: this.userName}
    let uid = this.userDetails?.uid || ''
    this.userDBService.updateUser(uid, _data).then(() => {
      this.loading.setLoading(false)
      this.editMode = false
      this.userDBService.fetchCurrentUser(uid)
      this.alert.sendAlert('User Details Updated.')
    }, err => {
      this.loading.setLoading(false)
      this.alert.sendAlert('Failed to update user details.')
    })
  }
}
