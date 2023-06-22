import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {BaseLayoutComponent} from "./layouts/base-layout/base-layout.component";
import {BaseLayoutRoutes} from "./shared/routes/base-layout-routes";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth-routing.module').then(m => m.AuthRoutingModule)
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: BaseLayoutRoutes
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
