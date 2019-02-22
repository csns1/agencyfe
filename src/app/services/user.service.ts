import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../interfaces/User';
import { environment } from '../../environments/environment';
import {a} from '@angular/core/src/render3';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private serverUrl= environment.host;

  constructor(private http: HttpClient) { }

  getUserList():Observable<User[]>{
    return this.http.get<User[]>(this.serverUrl+`/users`);
  }
  deleteUser(username:String):Observable<any>{
    return this.http.delete(this.serverUrl+`/user/${username}`)
  }

  updateUser(toBeUpdated: User) :Observable<User>{
    return this.http.put<User>(this.serverUrl+`/user/${toBeUpdated.username}`,toBeUpdated);
  }
}
