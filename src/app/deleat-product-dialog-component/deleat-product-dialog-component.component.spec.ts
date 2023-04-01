import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleatProductDialogComponentComponent } from './deleat-product-dialog-component.component';

describe('DeleatProductDialogComponentComponent', () => {
  let component: DeleatProductDialogComponentComponent;
  let fixture: ComponentFixture<DeleatProductDialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleatProductDialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleatProductDialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
