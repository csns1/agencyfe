import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import Swal from 'sweetalert2'
import {PaymentService} from "../../services/payment.service";
import {PaymentCompleteDto} from "../../interfaces/PaymentCompleteDto";

@Component({
  selector: 'app-complete-payment',
  templateUrl: './complete-payment.component.html',
  styleUrls: ['./complete-payment.component.css']
})
export class CompletePaymentComponent implements OnInit {
  private bookingId: number;
  private paymentId: string;
  private payerId: string;

  constructor(private activatedRoute: ActivatedRoute,
              private paymentService: PaymentService,
              private router: Router
              ) {
  }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      this.bookingId = +params['bookingId'];
      this.paymentId = params['paymentId'];
      this.payerId = params['PayerID'];
      this.showLoader()

    });
  }

  private showLoader() {
    Swal.fire({
      title: 'Please Wait..!',
      text: 'Payment is being processed',
      onBeforeOpen: () => {
        Swal.showLoading();
        this.completePayment();
      }
    }).then((result) => {

    })
  }

  private completePayment() {
    let dto: PaymentCompleteDto = {
      bookingId: this.bookingId,
      payerId: this.payerId,
      paymentId: this.paymentId
    }
    this.paymentService.completePayment(dto).subscribe(data => {
      Swal.hideLoading();

      if (data['status'] == 'success'){
        Swal.fire(
          'Payment Completed',
          'Your Payment has been completed.',
          'success'
        ).then(()=>this.router.navigate(['home']))
      }
      else {
        Swal.fire(
          'Payment Error!',
          data['message'],
          'error'
        ).then(res=>this.router.navigate(['home']))
      }
    });;
  }
}
