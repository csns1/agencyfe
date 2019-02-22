import { Component, OnInit } from '@angular/core';

import { TokenStorageService } from '../auth/token-storage.service';
// @ts-ignore
import {PackageGetDto} from '../interfaces/PackageDtos';
import {Observable, of} from 'rxjs';
import {TravelPackageService} from '../services/travel-package.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  packages: PackageGetDto[];
  query: any;

  constructor(private token: TokenStorageService,private travelPackageService:TravelPackageService) { }

  ngOnInit() {
  this.travelPackageService.getPackageList().subscribe(data =>{
    this.packages = data
  })
  }

  logout() {
    this.token.signOut();
    window.location.reload();
  }

  onSearch() {
    console.log(this.query)
  }
}
