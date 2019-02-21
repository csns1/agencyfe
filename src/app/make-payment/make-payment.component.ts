import { Component, OnInit, ViewChild } from '@angular/core';
 import { FormGroup, FormBuilder, Validators } from "@angular/forms";
  
  import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";

import { BookingGetDto } from 'src/app/interfaces/bookingget-dto';
import { PaymentService } from '../payment.service';
   
@Component({
  selector: 'app-makepayment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
        
    cardOptions: ElementOptions = {
      style: {
        base: {
          iconColor: '#666EE8',
          color: '#31325F',
          lineHeight: '40px',
          fontWeight: 300,
          fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
          fontSize: '18px',
          '::placeholder': {
            color: '#CFD7E0'
          }
        }
      }
    };
   
    elementsOptions: ElementsOptions = {
      locale: 'es'
    };
   
    stripeTest: FormGroup;
     private Booking: BookingGetDto;
     
    constructor(
      private fb: FormBuilder,
      private stripeService: StripeService,
      private Payment: PaymentService) {}
   
    ngOnInit() {
      this.stripeTest = this.fb.group({
        name: ['', [Validators.required]]
      });
    }
 
    chargeCreditCard() {
      let form = document.getElementsByTagName("form")[0];
      (<any>window).Stripe.card.createToken({
        number: form.cardNumber.value,
        exp_month: form.expMonth.value,
        exp_year: form.expYear.value,
        cvc: form.cvc.value
      }, (status: number, response: any) => {
        if (status === 200) {
          let token = response.id;
         
          this.Payment.chargeCard(token);
        } else {
          console.log(response.error.message);
        }
      });
    }
  }