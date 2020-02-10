import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DialogService} from '../services/dialog.service';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {BookingGetDto} from '../interfaces/bookingget-dto';
import {BookingService} from '../services/booking.service';


import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {TokenStorageService} from '../auth/token-storage.service';
import {PrintService} from '../services/print.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Observable, of} from 'rxjs';
import {CustomerDto} from '../interfaces/customerDto';

@Component({
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})

export class BookingsComponent implements OnInit {

  displayedColumns: string[] = [ 'name', 'booker', 'date', 'price', 'cancel'];
  dataSource: MatTableDataSource<BookingGetDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  bookings: BookingGetDto[] = [];
  errorMessage: string;
  customerModal:BsModalRef
  private toBeShowed: BookingGetDto;
  customerObservable : Observable<CustomerDto[]>
  constructor(private bookingService: BookingService,private modalService:BsModalService,private printService:PrintService, private dialogService: DialogService, private tokenservice: TokenStorageService) {

  }

  ngOnInit() {

this.initData();
  }
  initData(){
    this.getObservableList().subscribe(
      data => {
        this.bookings = data;
        this.dataSource = new MatTableDataSource(this.bookings);
        this.dataSource.paginator = this.paginator;
        this.noData=data.length==0
      },
      error => {
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
  getObservableList() {
    if (!this.tokenservice.getAuthorities().includes('KLIENT') ) {
      return this.bookingService.getBookings();
    } else {
      return this.bookingService.getBookingsByUsername(this.tokenservice.getUsername());
    }

  }

  pageTitle = 'Booking List';
  noData: boolean;

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getTotalCost() {
    return this.bookings.map(t => t.totalPayment).reduce((acc, value) => acc + value, 0);

  }
  isKlient(){
    return this.tokenservice.getAuthorities().includes("KLIENT");
  }
  cancelBooking(id: number) {

    this.dialogService.openConfirmDialog('Are you sure to cancel this booking?')
      .afterClosed().subscribe(res => {
      if (res) {
        this.bookingService.deleteBooking(id).subscribe(d=>{
         this.initData()
        });
      }
    });
    error => {
      this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
    };
  }

  printoFature(id: any,templateRef:TemplateRef<any>) {
    this.getObservableList().subscribe(data=>{
      data.forEach(e=>{
        if(e.id==id){
          this.toBeShowed=e;
          this.customerObservable=of(e.customerList)
          this.customerModal=this.modalService.show(templateRef)
        }
      })
    })
  }

  getDate(bookDate: string) {
    let d  =new Date((+bookDate)*1000);
    return d.toDateString();
  }
}



