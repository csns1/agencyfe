import { Injectable } from '@angular/core';
import {PackageDatesDto} from '../interfaces/PackageDatesDto';
import {CustomerDto} from '../interfaces/customerDto';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  public packageDateR:PackageDatesDto;
 public  customers: Array<CustomerDto>;
}
