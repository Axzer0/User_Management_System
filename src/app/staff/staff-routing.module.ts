import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StaffTableComponent} from "./staff-table/staff-table.component";

const routes: Routes = [
  {
    path: '',
    component: StaffTableComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
