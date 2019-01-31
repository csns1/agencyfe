
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { BookingGetDto } from '../interfaces/bookingget-dto';
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
      return this.http.get<BookingGetDto[]>(this.testURL)
    
  .pipe(catchError(this.handleErrors<BookingGetDto[]>('getBookings',[])));

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
