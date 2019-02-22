import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DestinationGetDto} from '../interfaces/DestinationDtos';
import {Observable} from 'rxjs';
import {User} from '../interfaces/User';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private serverUrl= environment.host;

  constructor(private http: HttpClient) { }


  getAllDestinations():Observable<DestinationGetDto[]> {
   return this.http.get<DestinationGetDto[]>(this.serverUrl+`/destination/all`)
  }
}
