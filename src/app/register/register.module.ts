import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { StaffDetailsComponent } from './staff-details/staff-details.component';
import { ContactDetailsComponent } from './contact-details/contact-details.component';
import { ComplianceDetailsComponent } from './compliance-details/compliance-details.component';
import {SharedModule} from "../shared/shared.module";
import {GenericFormModule} from "../generic-form/generic-form.module";
import {MatStepperModule} from "@angular/material/stepper";
import {MatDividerModule} from "@angular/material/divider";
import {ViewDialogComponent} from "./view-dialog/view-dialog.component";
import {StaffModule} from "../staff/staff.module";


@NgModule({
  declarations: [
    RegistrationComponent,
    StaffDetailsComponent,
    ContactDetailsComponent,
    ComplianceDetailsComponent,
    ViewDialogComponent
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    SharedModule,
    GenericFormModule,
    MatStepperModule,
    MatDividerModule,
    StaffModule
  ]
})
export class RegisterModule { }
