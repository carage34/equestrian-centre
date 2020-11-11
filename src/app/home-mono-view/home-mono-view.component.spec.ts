import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMonoViewComponent } from './home-mono-view.component';

describe('HomeMonoViewComponent', () => {
  let component: HomeMonoViewComponent;
  let fixture: ComponentFixture<HomeMonoViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMonoViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMonoViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
