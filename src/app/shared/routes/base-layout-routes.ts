import {Routes} from "@angular/router";
import {dashboardGuard} from "../guards/dashboard.guard";
import {registerGuard} from "../guards/register.guard";

export const BaseLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [dashboardGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('../../register/register.module').then(m => m.RegisterModule),
    canActivate: [registerGuard]
  },
  {
    path: 'staff',
    loadChildren: () => import('../../staff/staff.module').then(m => m.StaffModule),
    canActivate: [dashboardGuard]
  }
];
