import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StaffService} from "../../staff/service/staff.service";
import {LoadingService} from "../../shared/service/loading.service";
import {FirestoreService} from "../../shared/service/firestore.service";
import {AlertService} from "../../shared/service/alert.service";
import {Router} from "@angular/router";
import {CurrentUserService} from "../../shared/service/current-user.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{

  current: number = 0

  title = [ '','Basic Details', 'Contact Details', 'Compliance Details']

  constructor(private staffDBService: StaffService,
              private userDBService: FirestoreService,
              private alert: AlertService,
              private router: Router,
              private currentUser: CurrentUserService,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.checkFormCompletion()
  }

  nextForm(value: number){
    console.log(value)
    this.current = value
    this.cdr.detectChanges()
  }
  checkFormCompletion(){
    //test which forms have been completed if verification is still incomplete
    this.staffDBService.getCurrentUserRegistrationDetails().subscribe((res) => {
      console.log(res)
      if (res[0]){
        if (res[0].hasOwnProperty('basic')){
          this.current = 2
          this.cdr.detectChanges()
        }
        if (res[0].hasOwnProperty('contact')){
          this.current = 3
          this.cdr.detectChanges()
        }
        if (res[0].hasOwnProperty('compliance')){
          this.current = 4
          this.updateVerificationStatus()
          this.cdr.detectChanges()
        }
      } else {
        this.current = 1
        this.cdr.detectChanges()
      }
    }, err => {
    })
  }

  updateVerificationStatus(){
    this.userDBService.updateVerifiedStatus().then(async (res: any) =>{
      await this.userDBService.fetchCurrentUser(this.currentUser.uid)
      this.router.navigate(['/dashboard']).then(
        () => this.alert.sendAlert('Registration is complete')
      )
    },err => {
      this.alert.sendAlert('Failed to complete registration')
    })
  }
}
