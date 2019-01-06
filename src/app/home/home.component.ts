import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  packages: any;
  query: any;

  constructor(private token: TokenStorageService) { }

  ngOnInit() {
    this.packages=this.createTestPackage()
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }
  createTestPackage():any{
    return [{'id':1},{'id':3},{'id':2},{'id':4},{'id':5}]
  }

  onSearch() {
    console.log(this.query)
  }
}
