import {User} from './User';
import {PackageDatesDto} from './PackageDatesDto';
import {CustomerDto}  from './customerDto';

export interface BookingGetDto {
    id: number,
    bookDate:string,
    booker: User,
    customerDtoList: Array<CustomerDto>,
    totalPayment: number,
    travelPackage: PackageDatesDto
}
    

