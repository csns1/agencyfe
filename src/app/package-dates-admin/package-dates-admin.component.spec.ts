import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PackageDatesAdminComponent } from './package-dates-admin.component';

describe('PackageDatesAdminComponent', () => {
  let component: PackageDatesAdminComponent;
  let fixture: ComponentFixture<PackageDatesAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PackageDatesAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PackageDatesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
