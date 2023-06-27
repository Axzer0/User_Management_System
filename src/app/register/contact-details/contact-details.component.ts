import { Component } from '@angular/core';
import {FormInterface} from "../../generic-form/form-interface";
import {StaffContactDetails} from "../../../assets/Forms/StaffContactDetails";

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent {
  form: FormInterface = StaffContactDetails
}
