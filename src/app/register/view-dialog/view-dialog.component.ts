import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss']
})
export class ViewDialogComponent implements  OnInit{

  title: string = ''
  constructor(public dialogRef: MatDialogRef<ViewDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {
    if (this.data){
      switch (this.data.view){
        case 'basic' : this.title = 'Basic Details'; break;
        case 'contact' : this.title = 'Contact Details';break;
        case 'compliance' : this.title = 'Compliance Details';break;
      }
    }
  }

  keepEditing(): void {
    this.dialogRef.close();
  }
}
