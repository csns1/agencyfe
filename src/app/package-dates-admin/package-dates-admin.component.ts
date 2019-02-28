import {ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import * as $ from 'jquery';
import {PackageDatesDto} from '../interfaces/PackageDatesDto';
import {TravelPackageService} from '../services/travel-package.service';
import {ToastrService} from 'ngx-toastr';
import 'datatables.net';
import 'datatables.net-bs4';
import {BookingService} from '../services/booking.service';
@Component({
  selector: 'app-package-dates-admin',
  templateUrl: './package-dates-admin.component.html',
  styleUrls: ['./package-dates-admin.component.css']
})
export class PackageDatesAdminComponent implements OnInit {
  packageDates:PackageDatesDto[];
  dataTable: any;

  constructor(private packageService:TravelPackageService,private toastr: ToastrService,private chRef: ChangeDetectorRef,private bookingService:BookingService) { }

  ngOnInit() {
    this.packageService.getAllPackageDates().subscribe(value =>{
      this.packageDates=value;
      this.chRef.detectChanges();
      const table: any = $('table');
      this.dataTable = table.DataTable();
      this.fillData();
    });
  }
  getAllBookingsForPackageDateId(id){

  }

  getDate(startTime: string) {
    return new Date((+startTime)*1000).toDateString()
  }

  private fillData() {
    this.packageDates.forEach(e=>{
      this.bookingService.getEarningsByPackageDateId(e.id).subscribe(data=>{
        e.earnings=data;
      },()=>{ e.earnings= 0;})

    })
  }

  getMoneyString(earnings: number) {
    if(earnings==null)return "-"
    return "$"+earnings
  }
}
