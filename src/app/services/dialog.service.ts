import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatConfirmDialogComponent } from '../matconfirmdialog/matconfirmdialog.component';


@Injectable({
  providedIn: 'root'
})
export class DialogService {

    constructor(private dialog: MatDialog) { }

  openConfirmDialog(msg){
   return this.dialog.open(MatConfirmDialogComponent,{
      width: '390px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      position: { top: "20%" },
      data :{
        message : msg
      }
    });
  }
}

