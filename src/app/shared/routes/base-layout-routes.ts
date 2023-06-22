import {Routes} from "@angular/router";

export const BaseLayoutRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('../../dashboard/dashboard-routing.module').then(m => m.DashboardRoutingModule)
  }
];
