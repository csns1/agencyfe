import { DestinationGetDto} from './DestinationDtos';

export interface DestinationPerPackageGetDto {
  destination: DestinationGetDto;
  id: number;
  numberOfNights: number;
}
export interface DestinationPerPackagePostDto {
  id:number;
  destinationId:number;
  numberOfNights:number;
}
