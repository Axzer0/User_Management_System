import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { ViewComponent } from './view/view/view.component';
import { BasicDetailsViewComponent } from './view/basic-details-view/basic-details-view.component';
import {SharedModule} from "../shared/shared.module";
import { ContactDetailsViewComponent } from './view/contact-details-view/contact-details-view.component';
import { ComplianceDetailsViewComponent } from './view/compliance-details-view/compliance-details-view.component';


@NgModule({
    declarations: [
        ViewComponent,
        BasicDetailsViewComponent,
        ContactDetailsViewComponent,
        ComplianceDetailsViewComponent
    ],
    exports: [
        BasicDetailsViewComponent,
      ContactDetailsViewComponent,
      ComplianceDetailsViewComponent
    ],
    imports: [
        CommonModule,
        StaffRoutingModule,
      SharedModule
    ]
})
export class StaffModule { }
