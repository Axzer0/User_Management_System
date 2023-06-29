import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {StaffService} from "../../staff/service/staff.service";
import {LoadingService} from "../../shared/service/loading.service";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit{

  current: number = 0

  title = [ '','Basic Details', 'Contact Details', 'Compliance Details']

  constructor(private staffDBService: StaffService, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.checkFormCompletion()
  }

  nextForm(value: number){
    this.current = value
  }
  checkFormCompletion(){
    //test which forms have been completed if verification is still incomplete
    this.staffDBService.getCurrentUserRegistrationDetails().subscribe((res) => {
      console.log(res)
      if (res[0]){
        if (!res[0].hasOwnProperty('basic')){
          this.current = 1
          this.cdr.detectChanges()
          return
        }
        if (!res[0].hasOwnProperty('contact')){
          this.current = 2
          this.cdr.detectChanges()
          return
        }
        if (!res[0].hasOwnProperty('document')){
          this.current = 3
          this.cdr.detectChanges()
          return
        }
      } else {
        this.current = 1
        this.cdr.detectChanges()
      }
    }, err => {
    })
  }
}
