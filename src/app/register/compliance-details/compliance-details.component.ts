import { Component } from '@angular/core';
import {FormInterface} from "../../generic-form/form-interface";
import {StaffComplianceDetails} from "../../../assets/Forms/StaffComplianceDetails";

@Component({
  selector: 'app-compliance-details',
  templateUrl: './compliance-details.component.html',
  styleUrls: ['./compliance-details.component.scss']
})
export class ComplianceDetailsComponent {
  form: FormInterface = StaffComplianceDetails
}
