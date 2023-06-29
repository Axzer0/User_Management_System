import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaffRoutingModule } from './staff-routing.module';
import { ViewComponent } from './view/view/view.component';
import { BasicDetailsComponent } from './view/basic-details/basic-details.component';
import {SharedModule} from "../shared/shared.module";


@NgModule({
    declarations: [
        ViewComponent,
        BasicDetailsComponent
    ],
    exports: [
        BasicDetailsComponent
    ],
    imports: [
        CommonModule,
        StaffRoutingModule,
      SharedModule
    ]
})
export class StaffModule { }
