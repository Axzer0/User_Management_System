import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from "@angular/platform-browser";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import { AuthHeaderComponent } from './components/auth-header/auth-header.component';
import { AuthFooterComponent } from './components/auth-footer/auth-footer.component';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  declarations: [
    AuthHeaderComponent,
    AuthFooterComponent
  ],
  imports: [
    CommonModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  exports: [
    AuthHeaderComponent,
    AuthFooterComponent,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule
  ]
})
export class SharedModule { }
