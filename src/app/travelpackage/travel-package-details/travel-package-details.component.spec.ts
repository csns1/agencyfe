import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPackageDetailsComponent } from './travel-package-details.component';

describe('TravelPackageDetailsComponent', () => {
  let component: TravelPackageDetailsComponent;
  let fixture: ComponentFixture<TravelPackageDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelPackageDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelPackageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
