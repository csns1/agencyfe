import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPackageEditComponent } from './travel-package-edit.component';

describe('TravelPackageEditComponent', () => {
  let component: TravelPackageEditComponent;
  let fixture: ComponentFixture<TravelPackageEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelPackageEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelPackageEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
