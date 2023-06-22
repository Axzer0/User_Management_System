import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import {MatSelectModule} from '@angular/material/select';



@NgModule({
  declarations: [
    AuthHeaderComponent,
    AuthFooterComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule
  ],
  exports: [
    AuthHeaderComponent,
    AuthFooterComponent,
    MatSelectModule
  ]
})
export class SharedModule { }
