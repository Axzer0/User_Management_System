import {Component, EventEmitter, Output} from '@angular/core';
import {FormInterface} from "../../generic-form/form-interface";
import {StaffDetailsForm} from "../../../assets/Forms/StaffDetailsForm";
import {BasicDetailsInterface} from "../../staff/interface/staff-form-interface";
import {MatDialog} from "@angular/material/dialog";
import {ViewDialogComponent} from "../view-dialog/view-dialog.component";
import {LoadingService} from "../../shared/service/loading.service";
import {StaffService} from "../../staff/service/staff.service";
import {AlertService} from "../../shared/service/alert.service";


@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.scss']
})
export class StaffDetailsComponent {
  form: FormInterface = StaffDetailsForm
  @Output() next: EventEmitter<any> = new EventEmitter<any>()

  formData: BasicDetailsInterface | null = null

  constructor(public dialog: MatDialog,
              public alert: AlertService,
              private loading: LoadingService,
              private staffDBService: StaffService) {
  }

  submitBasicDetails(){
    this.loading.setLoading(true)
    this.staffDBService.submitBasicDetails(this.formData as BasicDetailsInterface).then((res) =>{
      this.alert.sendAlert('Basic details Added')
      this.loading.setLoading(false)
      this.next.emit(2)
    }, err => {
      this.alert.sendAlert('Something went wrong !')
      this.loading.setLoading(false)
    })
  }

  confirmSubmit(value: BasicDetailsInterface){
    this.formData = value
    if (this.formData.other){
      this.formData.gender = this.formData.other
      delete this.formData['other']
    }
    const dialogRef = this.dialog.open(ViewDialogComponent, {
      data: {
        formDetails: value,
        view: 'basic'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.submitBasicDetails()
      }
    });
  }
}
