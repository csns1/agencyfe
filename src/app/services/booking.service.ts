
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import {BookingGetDto, BookingPostDto} from '../interfaces/bookingget-dto';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  private bookingUrl = 'http://localhost:8080/api/test/booking';
  private serverUrl= environment.host;
  private testURL='http://localhost:4200/assets/bookings.json';

    constructor(private http: HttpClient) { }

    getBookings(): Observable<BookingGetDto[]> {
      return this.http.get<BookingGetDto[]>(this.serverUrl+`/booking/all`)
    
  .pipe(catchError(this.handleErrors<BookingGetDto[]>('getBookings',[])));

  }
  addBooking(body:BookingPostDto){
      return this.http.post<BookingGetDto>(this.serverUrl+`/booking`,body)
  }
  getBookingsByUsername(username:String){
      return this.http.get<BookingGetDto[]>(this.serverUrl+`/booking/user/`+username);
  }
  getBookingsByPackageDateId(id:number){
      return this.http.get<BookingGetDto[]>(this.serverUrl+`/booking/package-dates/`+id)
  }
  getEarningsByPackageDateId(id:number){
      return this.http.get<number>(this.serverUrl+`/booking/package-dates/earning/`+id)
  }
  deleteBooking (id: number): Observable<any> {
    return this.http.delete(this.serverUrl+`/booking/${id}`)
      .pipe(
        catchError(this.handleErrors('deleteBooking'))
      );
  }
  private handleErrors<T> (operation='operation', result?:T)
{
  return (error:any):Observable<T>=>{
    console.error(error);
    return of (result as T);
  }
}}
