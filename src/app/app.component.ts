import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './auth/token-storage.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private roles: string[];
  authority: string;
  username:string;
  admin: boolean;
  klient: boolean;
  constructor(private tokenStorage: TokenStorageService) { }
  ngOnChanges()
  {
    if (this.tokenStorage.getToken()) {
      this.username=this.tokenStorage.getUsername();
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ADMIN') {
          this.authority = 'ADMIN';
          return false;
        } else if (role === 'KLIENT') {
          this.authority = 'KLIENT';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }
  ngOnInit() {
    this.jqueryStuff();
    if (this.tokenStorage.getToken()) {
      this.username=this.tokenStorage.getUsername();
      this.roles = this.tokenStorage.getAuthorities();
      this.roles.every(role => {
        if (role === 'ADMIN') {
          this.authority = 'ADMIN';
          this.admin=true;
          return false;
        } else if (role === 'KLIENT') {
          this.authority = 'KLIENT';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }

  private jqueryStuff() {
    var trigger = $('.hamburger'),
      overlay = $('.overlay'),
      isClosed = false;
    $(".routerA").click(function () {
      hamburger_cross();
      $('#wrapper').toggleClass('toggled');
    });
    trigger.click(function () {
      hamburger_cross();
    });

    function hamburger_cross() {

      if (isClosed == true) {
        overlay.hide();
        trigger.removeClass('is-open');
        trigger.addClass('is-closed');
        isClosed = false;
      } else {
        overlay.show();
        trigger.removeClass('is-closed');
        trigger.addClass('is-open');
        isClosed = true;
      }
    }

    $('[data-toggle="offcanvas"]').click(function () {
      $('#wrapper').toggleClass('toggled');
    });
  }
  logout(){
    this.tokenStorage.signOut();
    window.location.reload();
  }

  isKlient() {
  return this.authority=="KLIENT"
  }
  isAdmin(){
    return this.authority=="ADMIN"
  }
}
