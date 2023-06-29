import {Component, EventEmitter, Output} from '@angular/core';
import {FormInterface} from "../../generic-form/form-interface";
import {StaffContactDetails} from "../../../assets/Forms/StaffContactDetails";
import {ContactDetailsInterface} from "../../staff/interface/staff-form-interface";
import {MatDialog} from "@angular/material/dialog";
import {AlertService} from "../../shared/service/alert.service";
import {LoadingService} from "../../shared/service/loading.service";
import {StaffService} from "../../staff/service/staff.service";
import {ViewDialogComponent} from "../view-dialog/view-dialog.component";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  form: FormInterface = StaffContactDetails
  @Output() next: EventEmitter<any> = new EventEmitter<any>()
  formData: ContactDetailsInterface | null = null

  constructor(public dialog: MatDialog,
              public alert: AlertService,
              private loading: LoadingService,
              private staffDBService: StaffService) {
  }

  submitContactDetails(){
    this.loading.setLoading(true)
    this.staffDBService.submitContactDetails(this.formData as ContactDetailsInterface).then((res) =>{
      this.alert.sendAlert('Contact details Added')
      this.loading.setLoading(false)
      this.next.emit(3)
    }, err => {
      this.alert.sendAlert('Something went wrong !')
      this.loading.setLoading(false)
    })
  }

  confirmSubmit(value: ContactDetailsInterface){
    this.formData = value

    const dialogRef = this.dialog.open(ViewDialogComponent, {
      data: {
        formDetails: value,
        view: 'contact'
      },
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result){
        this.submitContactDetails()
      }
    });
  }
}
