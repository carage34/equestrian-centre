import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUserViewComponent } from './home-user-view.component';

describe('HomeUserViewComponent', () => {
  let component: HomeUserViewComponent;
  let fixture: ComponentFixture<HomeUserViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeUserViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeUserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
