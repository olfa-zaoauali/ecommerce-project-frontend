import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductIstComponent } from './product-ist.component';

describe('ProductIstComponent', () => {
  let component: ProductIstComponent;
  let fixture: ComponentFixture<ProductIstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductIstComponent]
    });
    fixture = TestBed.createComponent(ProductIstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
