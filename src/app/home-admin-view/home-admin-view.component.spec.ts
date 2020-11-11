import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAdminViewComponent } from './home-admin-view.component';

describe('HomeAdminViewComponent', () => {
  let component: HomeAdminViewComponent;
  let fixture: ComponentFixture<HomeAdminViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeAdminViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
