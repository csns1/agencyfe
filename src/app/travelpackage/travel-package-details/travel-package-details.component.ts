import { Component, OnInit, ViewChild } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { MakePaymentComponent } from 'src/app/make-payment/make-payment.component';

@Component({
  selector: 'travel-package-details',
  templateUrl: './travel-package-details.component.html',
  styleUrls: ['./travel-package-details.component.css']
})
export class TravelPackageDetailsComponent implements OnInit {

  id: number;
  private sub: any;
  radioModel = 'Middle';
  buy=false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];

    });
    
  }
  Buy(): void {
    this.buy = !this.buy;
  }
}
