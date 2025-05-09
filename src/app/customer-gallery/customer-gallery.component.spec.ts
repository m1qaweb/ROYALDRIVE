import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerGalleryComponent } from './customer-gallery.component';

describe('CustomerGalleryComponent', () => {
  let component: CustomerGalleryComponent;
  let fixture: ComponentFixture<CustomerGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerGalleryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
