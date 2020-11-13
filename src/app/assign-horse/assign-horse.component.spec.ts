import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignHorseComponent } from './assign-horse.component';

describe('AssignHorseComponent', () => {
  let component: AssignHorseComponent;
  let fixture: ComponentFixture<AssignHorseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignHorseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignHorseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
