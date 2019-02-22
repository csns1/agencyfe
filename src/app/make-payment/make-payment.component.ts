import { Component, OnInit, ViewChild, Input } from '@angular/core';
import {FormGroup, FormControl, Validators } from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";

import { StripeService, StripeCardComponent, ElementOptions, ElementsOptions } from "ngx-stripe";
import { PaymentService } from '../services/payment.service';
import { BookingGetDto } from '../interfaces/bookingget-dto';

@Component({
  selector: 'app-makepayment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  ngOnInit(): void {}  
  
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  //stilizim

;
  Booking :BookingGetDto;
  cardOptions: ElementOptions = {
      style: {
        base: {
          iconColor: '#111',
          color: '#111',
          fontSize:"16px",
          '::placeholder': {
            color: '#111'
          }
        }
    }
  }


  elementsOptions: ElementsOptions = {
    locale: 'es'
  };
 

  constructor(private stripeService: StripeService, private httpclient: HttpClient,private Payment:PaymentService){}
    public paymentForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required)
   
    });
    

        
    chargeCreditCard(formdata: FormData) {
      this.stripeService.createToken(this.card.getCard(), {name} )
      .subscribe(result => {
        
        if(result.token){
          const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');


          let obj = {
            token: result.token.id,
            email: formdata["email"],
            user: formdata["name"],
            amount: this.Booking.totalPayment,
            product: this.Booking.id

          }

         
          this.httpclient.post("http://localhost:8000/payment",
          JSON.stringify(obj),
          {headers: headers} ).subscribe( data => {
            console.log("---- Transaction Data -----");
            
            console.log(data);
          });
          
       
          console.log(result.token.id);
        }else if(result.error){
          console.log("Vendosni numrat e kartes");
        }

      });



    }


  

}
 
   
    
  
 
   