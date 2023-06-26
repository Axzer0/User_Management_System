import { Component } from '@angular/core';
import {StaffDetailsForm} from "../../../assets/Forms/StaffDetailsForm";
import {FormInterface} from "../../generic-form/form-interface";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  form: FormInterface = StaffDetailsForm
}
