import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSuperViewComponent } from './home-super-view.component';

describe('HomeSuperViewComponent', () => {
  let component: HomeSuperViewComponent;
  let fixture: ComponentFixture<HomeSuperViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeSuperViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeSuperViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
