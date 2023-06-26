import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import {SharedModule} from "../shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {GenericFormModule} from "../generic-form/generic-form.module";


@NgModule({
  declarations: [
    AdminComponent,
    UserComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    GenericFormModule,
    SharedModule
  ]
})
export class DashboardModule { }
