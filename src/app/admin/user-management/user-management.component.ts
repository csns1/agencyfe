import {UserService} from '../../services/user.service';
import {TokenStorageService} from '../../auth/token-storage.service';
import {Component, OnInit, ChangeDetectorRef, TemplateRef, ViewChild} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';

import * as $ from 'jquery';
import 'datatables.net';
import 'datatables.net-bs4';
import {User} from '../../interfaces/User';
import {getTemplate} from 'codelyzer/util/ngQuery';
import {SignUpInfo} from '../../auth/signup-info';
import {Role} from '../../interfaces/Role';
import {AuthService} from '../../auth/auth.service';
@Component({
  selector: 'user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users:User[];
  dataTable: any;
  modalRef: BsModalRef;
  private toBeDeleted: User;
  newUser: SignUpInfo;
  roles:Role[];
  newRole:String;
  toBeUpdated:User;
  @ViewChild('updateCreateUser') createUser:TemplateRef<any>;
  private updateRoleModal:BsModalRef;
  private cUserModal: BsModalRef;

  constructor(private toastr: ToastrService,private modalService: BsModalService,private userService: UserService,private tokenService:TokenStorageService, private chRef: ChangeDetectorRef,private authService: AuthService) { }

  ngOnInit() {
    this.userService.getUserList().subscribe(value =>{
    this.users=value;
    this.chRef.detectChanges();
    const table: any = $('table');
    this.dataTable = table.DataTable();
    });
    this.roles=[{name:"KLIENT",id:1,description:""},{name:"MENAXHER PAKETASH",id:2,description:""}];
    this.initNewUser();
  }
  initNewUser(){
    this.newUser={} as SignUpInfo;
    this.newUser.role= {name:"KLIENT"};
  }

  updateRole(user: User,template:TemplateRef<any>) {
    this.toBeUpdated=user;
    this.updateRoleModal=this.modalService.show(template);
  }

  delete(user: User,template: TemplateRef<any>) {
   this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
   this.toBeDeleted=user;
  }
  confirmDelete(){
   this.userService.deleteUser(this.toBeDeleted.username).subscribe(obs=>{
     this.modalRef.hide();
     this.users= this.users.filter(value => value.id!=this.toBeDeleted.id);
     this.toastr.success("User Deleted","Success");
   },
     error=>{
     this.toastr.error(error.message,"Error");
     })
  }
  onSubmit(){
      this.authService.signUp(this.newUser).subscribe(data => {
        this.initNewUser();
        this.users.push(data);
        this.cUserModal.hide();
        this.toastr.success('User Created Successfully', 'Success');
      },
        error => {
          this.cUserModal.hide();
          this.toastr.error(error.message,"Error");
      })
  }
  createUserPopup(){
    this.cUserModal = this.modalService.show(this.createUser);
  }

  editRole() {
    this.toBeUpdated.role.name=this.newRole;
    this.userService.updateUser(this.toBeUpdated).subscribe(updated=>{
    this.updateRoleModal.hide();
    this.toBeUpdated={}as User;
    this.toastr.success("User Role Updated","Success");
    this.users.forEach(e=> {if(e.id == updated.id){e=updated;}});
  })
    return false;
  }
}
