import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'home-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  showFilter:boolean;
  constructor() { }

  ngOnInit() {
    this.showFilter=false;
  }

  filter() {
    this.showFilter=!this.showFilter;
  }
}
