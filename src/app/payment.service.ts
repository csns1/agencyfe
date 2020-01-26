import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private paymentUrl = 'http://localhost:8080/api/payment';

  private serverUrl= environment.host;

  constructor(private http: HttpClient) { }

  chargeCard(token: string) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('token', token);
    this.http.post('http://localhost:8080/api/payment', {}, {headers: headers})
      .subscribe(resp => {
        console.log(resp);
      })
  }
  makePayment(sum) {
    return this.http.post(this.serverUrl+'/payment/create?sum='+sum, {});
  }

}
