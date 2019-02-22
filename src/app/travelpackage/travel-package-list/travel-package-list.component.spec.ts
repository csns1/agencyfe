import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPackageListComponent } from './travel-package-list.component';

describe('TravelPackageListComponent', () => {
  let component: TravelPackageListComponent;
  let fixture: ComponentFixture<TravelPackageListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelPackageListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelPackageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
