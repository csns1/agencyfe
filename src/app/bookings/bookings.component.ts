import { Component, OnInit, ViewChild } from '@angular/core';
import {DialogService} from '../services/dialog.service';
import { MatDialog, MatDialogConfig } from "@angular/material";
import { BookingGetDto } from '../interfaces/bookingget-dto';
import { BookingService } from '../services/booking.service';


import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
@Component({
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})

export class BookingsComponent implements OnInit {
  
  displayedColumns: string[] = ['id', "name",'date', 'price','cancel'];
  dataSource: MatTableDataSource<BookingGetDto>;
 
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
   bookings: BookingGetDto[] = [];
  errorMessage: string;

constructor(private bookingService:BookingService ,private dialogService: DialogService){
  
}

  ngOnInit()  {
    this.bookingService.getBookings().subscribe(
      data => {
        this.bookings = data;
        this.dataSource = new MatTableDataSource(this.bookings);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }

      
    );
    
  }
  pageTitle ='Booking List';
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTotalCost() {
    return this.bookings.map(t => t.totalPayment).reduce((acc, value) => acc + value, 0);
  
}

cancelBooking(id: number){
 
  this.dialogService.openConfirmDialog('Are you sure to cancel this booking?')
  .afterClosed().subscribe(res =>{
    if(res){
    this.bookingService.deleteBooking(id).subscribe()}});
    error => {
      this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
    }
  }
}



