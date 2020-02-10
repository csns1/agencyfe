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
import {IPayPalConfig} from "ngx-paypal";
import {Router} from "@angular/router";

@Component({
  selector: 'app-makepayment',
  templateUrl: './make-payment.component.html',
  styleUrls: ['./make-payment.component.css']
})
export class MakePaymentComponent implements OnInit {
  private customers: Array<CustomerDto>;
  private packageDates: PackageDatesDto;
  private totalPayment: string
  private sum;
  private userId: number;

  ngOnInit(): void {
    this.customers = this.dataService.customers;
    this.packageDates = this.dataService.packageDateR;
    this.sum = (this.packageDates.pricePerPerson * this.customers.length)
    this.totalPayment = '$' + this.sum;
    this.userService.getUserByUsername(this.tokenService.getUsername()).subscribe(data => this.userId = data.id);
    this.initConfig();

  }

  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  //stilizim

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
    , hidePostalCode: true
  };


  elementsOptions: ElementsOptions = {
    locale: 'en'
  };


  constructor(private token: TokenStorageService,
              private stripeService: StripeService,
              private toastr: ToastrService, private bookingService: BookingService,
              private tokenService: TokenStorageService,
              private router: Router,
              private userService: UserService, private httpclient: HttpClient, private paymentService: PaymentService, private dataService: DataServiceService) {
  }

  public paymentForm = new FormGroup({
    name: new FormControl("", Validators.required),
  });
  public payPalConfig?: IPayPalConfig;


  private initConfig(): void {
    this.payPalConfig = {
      clientId: 'AUbGBqVdOf9Sdb00B8jvHH8XGdlVy_wPUynbqEcXGCzczt-vxnLUqcD0wnw062IDDcQzWvrQihzD2TzD',
      // for creating orders (transactions) on server see
      // https://developer.paypal.com/docs/checkout/reference/server-integration/set-up-transaction/

      createOrderOnServer: (data) => fetch('https://travel-agency-alb.herokuapp.com/payment/create?sum=' + this.sum, {
        method: 'post',
        headers: new Headers({
          'Authorization': 'Bearer ' + this.token.getToken(),
          'Content-Type': 'application/x-www-form-urlencoded'
        })
      })
        .then((res) => res.json())
        .then((order) => data.orderID),
      onApprove: (data, actions) => {
        console.log('onApprove - transaction was approved, but not authorized', data, actions);
        actions.order.get().then(details => {
          console.log('onApprove - you can get full order details inside onApprove: ', details);
        });

      },
      onClientAuthorization: (data) => {
        console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      },
      onCancel: (data, actions) => {
        console.log('OnCancel', data, actions);

      },
      onError: err => {
        console.log('OnError', err);
      },
      onClick: (data, actions) => {
        console.log('onClick', data, actions);
      },
    };
  }


  chargeCreditCard(formdata: FormData) {
    this.stripeService.createToken(this.card.getCard(), {name})
      .subscribe(result => {

        if (result.token) {
          const headers = new HttpHeaders()
            .set('Content-Type', 'application/json');

          let body: BookingPostDto = {} as BookingPostDto;
          body.customerList = this.customers;
          body.packageDateId = this.packageDates.id;
          body.totalPayment = this.customers.length * this.packageDates.pricePerPerson
          body.bookerId = this.userId
          body.token = result.token.id

          this.bookingService.addBooking(body).subscribe(data => {
            this.toastr.success("Pagesa u krye me sukses!")
            this.router.navigate(['bookings'])
          }, () => {
            this.toastr.error("Ka ndodhur nje gabim pagesa nuk mund te kryhet")
          })

          console.log(result.token.id);
        } else if (result.error) {
          console.log("Vendosni numrat e kartes");
        }

      });


  }

  payWithPaypal() {
    let body: BookingPostDto = {} as BookingPostDto;
    body.customerList = this.customers;
    body.packageDateId = this.packageDates.id;
    body.totalPayment = this.customers.length * this.packageDates.pricePerPerson
    body.bookerId = this.userId;

    this.paymentService.makePayment(body).subscribe(data => {

      window.open(data['redirect_url'], "_blank");
    })
  }
}





