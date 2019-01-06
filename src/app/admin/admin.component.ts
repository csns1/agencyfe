import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import * as $ from 'jquery';
import {TokenStorageService} from '../auth/token-storage.service';
import {User} from '../interfaces/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  board: string;
  errorMessage: string;
  userName: string;
  user:User;
  constructor(private userService: UserService,private tokenService:TokenStorageService) { }

  ngOnInit() {
  this.userName= this.tokenService.getUsername();
    this.userService.getUserByUsername(this.userName).subscribe(
      user => {
        this.user = user;
        console.log(user);
      },
      error => {
        console.log(error);
        this.errorMessage = `${error.status}: ${JSON.parse(error.error).message}`;
      }
    );
  }
}
