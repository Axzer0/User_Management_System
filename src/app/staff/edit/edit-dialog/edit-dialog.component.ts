import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.scss']
})
export class EditDialogComponent {

  title: string = 'edit'

  constructor(public dialogRef: MatDialogRef<EditDialogComponent>,@Inject(MAT_DIALOG_DATA) public data: any) {
  }

  emit(value: any){
    this.dialogRef.close({
      data: value, from: this.data?.editFor || ''
    });
  }

  close(): void {
    this.dialogRef.close();
  }

}
