import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ElementOptions, ElementsOptions, StripeCardComponent, StripeService} from 'ngx-stripe';
import {PaymentService} from '../services/payment.service';
import {BookingPostDto} from '../interfaces/bookingget-dto';
import {DataServiceService} from '../services/data-service.service';
import {CustomerDto} from '../interfaces/customerDto';
import {PackageDatesDto} from '../interfaces/PackageDatesDto';
import {TokenStorageService} from '../auth/token-storage.service';
import {UserService} from '../services/user.service';
import {BookingService} from '../services/booking.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-makepayment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  private  customers:Array<CustomerDto>;
  private packageDates:PackageDatesDto;
  private totalPayment:string
   private userId:number;
  ngOnInit(): void {
    this.customers= this.dataService.customers;
    this.packageDates=this.dataService.packageDateR;
    this.totalPayment='$'+(this.packageDates.pricePerPerson*this.customers.length);
   this.userService.getUserByUsername( this.tokenService.getUsername()).subscribe(data=>this.userId=data.id);
  }

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  //stilizim

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
    },
    hidePostalCode:true
  }


  elementsOptions: ElementsOptions = {
    locale: 'en'
  };
 

  constructor(private stripeService: StripeService,private toastr:ToastrService,private bookingService:BookingService,private tokenService:TokenStorageService,private userService:UserService, private httpclient: HttpClient,private Payment:PaymentService,private dataService:DataServiceService){}
    public paymentForm = new FormGroup({
    name: new FormControl("", Validators.required),
    });
    

        
    chargeCreditCard(formdata: FormData) {
      this.stripeService.createToken(this.card.getCard(), {name} )
      .subscribe(result => {
        
        if(result.token){
          const headers = new HttpHeaders()
          .set('Content-Type', 'application/json');

          let body: BookingPostDto={} as BookingPostDto;
          body.customerList=this.customers;
          body.packageDateId=this.packageDates.id;
          body.totalPayment=this.customers.length * this.packageDates.pricePerPerson
          body.bookerId=this.userId
          body.token=result.token.id

          this.bookingService.addBooking(body).subscribe(data=>{
            this.toastr.success("Pagesa u krye me sukses!")
          },()=>{
            this.toastr.error("Ka ndodhur nje gabim pagesa nuk mund te kryhet")})
       
          console.log(result.token.id);
        }else if(result.error){
          console.log("Vendosni numrat e kartes");
        }

      });



    }

}
 
   
    
  
 
