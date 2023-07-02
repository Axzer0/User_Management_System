import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import {SharedModule} from "../shared/shared.module";
import {MatCardModule} from "@angular/material/card";
import {GenericFormModule} from "../generic-form/generic-form.module";
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    HomeComponent
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
