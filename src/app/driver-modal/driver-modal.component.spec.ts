import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriverModalComponent } from './driver-modal.component';

describe('DriverModalComponent', () => {
  let component: DriverModalComponent;
  let fixture: ComponentFixture<DriverModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DriverModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
