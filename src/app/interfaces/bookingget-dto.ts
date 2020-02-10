import {User} from './User';
import {PackageDatesDto} from './PackageDatesDto';
import {CustomerDto}  from './customerDto';
import {Token} from 'ngx-stripe';

export interface BookingGetDto {
    id: number,
    bookDate:string,
    booker: User,
    customerList: Array<CustomerDto>,
    totalPayment: number,
    packageDate: PackageDatesDto
};


export  interface BookingPostDto {
  id: number,
  bookerId: number,
  customerList: Array<CustomerDto>,
  totalPayment: number,
  packageDateId: number,
  token:string
};
