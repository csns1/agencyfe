import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {CityGetDto, CityPostDto, CountryDto, DestinationGetDto, DestinationPostDto} from '../interfaces/DestinationDtos';
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
  getAllCountries():Observable<CountryDto[]>{
    return this.http.get<CountryDto[]>(this.serverUrl+`/country/all`)
  }
  getAllCities():Observable<CityGetDto[]>{
    return this.http.get<CityGetDto[]>(this.serverUrl+`/city/all`)
  }
  addDestination(destination:DestinationPostDto):Observable<DestinationGetDto>{
    return this.http.post<DestinationGetDto>(this.serverUrl+`/destination`,destination)
  }
  addCountry(country:CountryDto):Observable<CountryDto>{
    return this.http.post<CountryDto>(this.serverUrl+`/country`,country)
  }
  addCity(city:CityPostDto):Observable<CityGetDto>{
    return this.http.post<CityGetDto>(this.serverUrl+`/city`,city)
  }
  removeCountry(countryId:number){
   return this.http.delete(this.serverUrl+`/country/`+countryId)
  }
  removeCity(cityId:number){
    return this.http.delete(this.serverUrl+`/city/`+cityId)
  }
  removeDestination(destinationId:number){
    return this.http.delete(this.serverUrl+`/destination/`+destinationId)
  }
}
