import {Routes} from "@angular/router";

export const BaseLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'register',
    loadChildren: () => import('../../register/register.module').then(m => m.RegisterModule)
  }
];
