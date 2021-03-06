import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {User} from '../interfaces/User';
// @ts-ignore
import {PackageGetDto, PackagePostDto} from '../interfaces/PackageDtos';
import {HttpClient} from '@angular/common/http';
import {DestinationGetDto, DestinationPostDto} from '../interfaces/DestinationDtos';
import {PackageDatesDto, PackageDatesPostDto} from '../interfaces/PackageDatesDto';
import {DestinationPerPackagePostDto} from "../interfaces/DestinationPerPackagesDtos";

@Injectable({
  providedIn: 'root'
})
export class TravelPackageService {
  private serverUrl= environment.host;
  private openServerurl=environment.openHost
  constructor(private http: HttpClient) { }
  getPackageList() {
    return this.http.get<PackageGetDto[]>(this.openServerurl+`/packages/all`);
  }
  getPackageById(id:number){
    return this.http.get<PackageGetDto>(this.openServerurl+`/packages/`+id)
  }
  deletePackage(id: number) {
    return this.http.delete<PackageGetDto>(this.serverUrl+`/packages/`+id)
  }
  addPhotoToPackage(packageId:number,path:string){
    return this.http.post(this.serverUrl+`/packages/`+packageId+`/add-image`, path);
  }
  removePhoto(packageId: number, path: any) {
    return this.http.request('delete',this.serverUrl+`/packages/`+packageId+`/image`, { body : path});
  }

  removeDestination(packageId: number, destinationId: number) {
    return this.http.delete(this.serverUrl+`/packages/`+packageId+`/destination/`+destinationId);
  }
  addDestination(packageId: number, destination:DestinationPerPackagePostDto ) {
    return  this.http.post(this.serverUrl+`/packages/`+packageId+`/destination`,destination)
  }
  addPackageDate(packageId:number,packageDate:PackageDatesPostDto){
    return this.http.post(this.serverUrl+`/packages/`+packageId+`/dates`,packageDate)
  }
  removePackageDate(packageId:number,dateId:number){
    return this.http.delete(this.serverUrl+`/packages/`+packageId+`/dates/`+dateId)
  }
  getPackageDates(packageId:number){
    return this.http.get<PackageDatesDto[]>(this.openServerurl+`/packages/`+packageId+`/package-dates`)
  }

  editPackageDetails(packageId: number, packagePostDto: PackagePostDto) {
  return this.http.patch<PackageGetDto>(this.serverUrl+`/packages/`+packageId,packagePostDto)
  }
  createTravelPackage(packagePostDto:PackagePostDto){
    return this.http.post<PackageGetDto>(this.serverUrl+`/packages`,packagePostDto)
  }

  getAllPackageDates() {
    return this.http.get<PackageDatesDto[]>(this.serverUrl+`/packages/package-dates`)
  }
}
