import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import {User} from '../../interfaces/User';
@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users:User[];
  dataTable: any;
  constructor(private userService: UserService,private tokenService:TokenStorageService, private chRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.userService.getUserList().subscribe(value =>{
      this.users=value;
      this.chRef.detectChanges();
      const table: any = $('table');
      this.dataTable = table.DataTable();
    })
  }

}
