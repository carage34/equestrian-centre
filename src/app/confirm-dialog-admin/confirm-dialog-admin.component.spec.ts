import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDialogAdminComponent } from './confirm-dialog-admin.component';

describe('ConfirmDialogAdminComponent', () => {
  let component: ConfirmDialogAdminComponent;
  let fixture: ComponentFixture<ConfirmDialogAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDialogAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDialogAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
