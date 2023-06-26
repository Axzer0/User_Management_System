import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GFormComponent } from './g-form/g-form.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MAT_DATE_LOCALE, MatNativeDateModule} from "@angular/material/core";



@NgModule({
  declarations: [
    GFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [
    GFormComponent
  ],
  providers:[{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}]
})
export class GenericFormModule { }
