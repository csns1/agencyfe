import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from '../interfaces/User';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userUrl = 'http://localhost:8080/api/test/user';
  private pmUrl = 'http://localhost:8080/api/test/pm';
  private adminUrl = 'http://localhost:8080/api/test/admin';
  private serverUrl= environment.host;

  constructor(private http: HttpClient) { }

  getUserBoard(): Observable<string> {
    return this.http.get(this.userUrl, { responseType: 'text' });
  }

  getPMBoard(): Observable<string> {
    return this.http.get(this.pmUrl, { responseType: 'text' });
  }

  getAdminBoard(): Observable<string> {
    return this.http.get(this.adminUrl, { responseType: 'text' });
  }

  getUserByUsername(userName: string):Observable<User> {
    return this.http.get<User>(this.serverUrl+`/user/${userName}`)
  }
  getUserList():Observable<User[]>{
    return this.http.get<User[]>(this.serverUrl+`/users`);
  }

}
