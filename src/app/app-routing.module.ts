import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthLayoutComponent} from "./layouts/auth-layout/auth-layout.component";
import {BaseLayoutComponent} from "./layouts/base-layout/base-layout.component";
import {BaseLayoutRoutes} from "./shared/routes/base-layout-routes";
import {authGuard} from "./shared/guards/auth.guard";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/register' },
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: '',
    component: BaseLayoutComponent,
    children: BaseLayoutRoutes,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
