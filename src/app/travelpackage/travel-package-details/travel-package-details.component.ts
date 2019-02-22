import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { MakePaymentComponent } from 'src/app/make-payment/make-payment.component';
// @ts-ignore
import {PackageGetDto} from '../../interfaces/PackageDtos';
import {TravelPackageService} from '../../services/travel-package.service';

@Component({
  selector: 'travel-package-details',
  templateUrl: './travel-package-details.component.html',
  styleUrls: ['./travel-package-details.component.css']
})
export class TravelPackageDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  radioModel = 'Middle';
  travelPackageDetail:PackageGetDto
  priceRange: string;
  constructor(private route: ActivatedRoute,private travelPackageService:TravelPackageService) {}
  buy=false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.travelPackageService.getPackageById(this.id).subscribe(data=>{
        this.travelPackageDetail=data;
        this.priceRange=this.getPriceRange();
      })
    });

    });

  Buy(): void {
    this.buy = !this.buy;
  }

  getActiveClass(i: number) {
    if(i==0)return "active"
    return ""
  }

  private getPriceRange() {
    let prices = this.travelPackageDetail.packageDates.map(e => e.pricePerPerson);
    let min=Math.min.apply(Math,prices);
    let max=Math.max.apply(Math,prices);
    if(max==min)return "$"+max;
    return '$'+min+'-'+max;
  }

  getDateFromTime(arrivalTime: string) {
    let formatedDate=this.formatDate(new Date(arrivalTime));
    return formatedDate
  }
  formatDate(date) {
    const monthNames = [
      'Jan', 'Feb', 'Mar',
      'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep',
      'Oct', 'Nov', 'Dec'
    ];

    let day = date.getDate();
    let monthIndex = date.getMonth();
    let year = date.getFullYear();

    return day + ' ' + monthNames[monthIndex] + ' ' + year;
  }
}
