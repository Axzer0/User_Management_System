import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {TranslateModule} from "@ngx-translate/core";
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatIconModule} from "@angular/material/icon";
import {MatDialogModule} from '@angular/material/dialog';
import {InputFilterDirective} from "./directive/inputFilter.directive";
import { ViewFileComponent } from './components/view-file/view-file.component';
import { GenericTableComponent } from './components/generic-table/generic-table.component';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";


const MATERIAL = [
  MatSelectModule,
  MatCardModule,
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
  MatSnackBarModule,
  MatDividerModule,
  MatProgressBarModule,
  MatIconModule,
  MatDialogModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule
]

@NgModule({
  declarations: [
    AuthHeaderComponent,
    AuthFooterComponent,
    InputFilterDirective,
    ViewFileComponent,
    GenericTableComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MATERIAL,

  ],
  exports: [
    AuthHeaderComponent,
    AuthFooterComponent,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    MATERIAL,
    InputFilterDirective,
    ViewFileComponent,
    GenericTableComponent
  ]
})
export class SharedModule { }
