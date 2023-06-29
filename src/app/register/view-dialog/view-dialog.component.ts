import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-view-dialog',
  templateUrl: './view-dialog.component.html',
  styleUrls: ['./view-dialog.component.scss']
})
export class ViewDialogComponent {
  constructor(public dialogRef: MatDialogRef<ViewDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {}

  keepEditing(): void {
    this.dialogRef.close();
  }
}
