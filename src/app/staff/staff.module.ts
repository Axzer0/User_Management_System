import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { ViewComponent } from './view/view/view.component';
import { BasicDetailsViewComponent } from './view/basic-details-view/basic-details-view.component';
import {SharedModule} from "../shared/shared.module";
import { ContactDetailsViewComponent } from './view/contact-details-view/contact-details-view.component';


@NgModule({
    declarations: [
        ViewComponent,
        BasicDetailsViewComponent,
        ContactDetailsViewComponent
    ],
    exports: [
        BasicDetailsViewComponent,
      ContactDetailsViewComponent
    ],
    imports: [
        CommonModule,
        StaffRoutingModule,
      SharedModule
    ]
})
export class StaffModule { }
