import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-mat-confirm-dialog',
  templateUrl: './matconfirmdialog.component.html',
  styleUrls: ['./matconfirmdialog.component.css']
})
export class MatConfirmDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<MatConfirmDialogComponent>) { }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

}