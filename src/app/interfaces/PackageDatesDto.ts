export interface PackageDatesDto {
    earnings: number;
    arrivalTime? : string,
    id: number,
    pricePerPerson:number,
    startTime:string,
    packageName:string,
    numberOfPersons:number

}
export interface PackageDatesPostDto {
  arrivalTime:string,
  id:number,
  pricePerPerson:number,
  startTime:string,
  numberOfPersons:number
}
