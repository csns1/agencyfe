import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'travel-package-details',
  templateUrl: './travel-package-details.component.html',
  styleUrls: ['./travel-package-details.component.css']
})
export class TravelPackageDetailsComponent implements OnInit {
  id: number;
  private sub: any;
  radioModel = 'Middle';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];

    });

  }
}
