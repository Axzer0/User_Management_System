import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StaffTableComponent} from "./staff-table/staff-table.component";
import {ViewComponent} from "./view/view/view.component";

const routes: Routes = [
  {
    path: '',
    component: StaffTableComponent
  },
  {
    path: ':id',
    component: ViewComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaffRoutingModule { }
