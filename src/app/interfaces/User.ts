import {Role} from './Role';

export interface User {
  id: number ;

  username: String ;

  valid: boolean ;

  role :Role ;

  email: String ;
  firstName :String ;
  lastName :String ;
  address :String ;
  phone :String ;
}
