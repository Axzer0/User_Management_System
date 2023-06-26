import { Component } from '@angular/core';
import {FormInterface} from "../../generic-form/form-interface";
import {StaffDetailsForm} from "../../../assets/Forms/StaffDetailsForm";

@Component({
  selector: 'app-staff-details',
  templateUrl: './staff-details.component.html',
  styleUrls: ['./staff-details.component.scss']
})
export class StaffDetailsComponent {
  form: FormInterface = StaffDetailsForm
}
