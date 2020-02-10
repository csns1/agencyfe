
import {PackageDatesDto, PackageDatesPostDto} from './PackageDatesDto';
import {DestinationPerPackageGetDto, DestinationPerPackagePostDto} from "./DestinationPerPackagesDtos";

export interface PackageGetDto {
  id: number ;
  name: String ;
  description:String;
  images:string[];
  destinationList:Array<DestinationPerPackageGetDto>;
  packageDates:Array<PackageDatesDto>
}

export interface PackagePostDto {
  id:number;
  name:String;
  description:String;
  packageDates:Array<PackageDatesPostDto>;
  destinationList:Array<DestinationPerPackagePostDto>
}
