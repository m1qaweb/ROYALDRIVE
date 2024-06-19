import { Component, Inject, HostListener, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface Car {
  make: string;
  model: string;
  year: number;
  color: string;
  mileage: number;
  price: number;
  fuelType: string;
  transmission: string;
  engine: string;
  horsepower: number;
  features: string[];
  owners: number;
}

@Component({
  standalone: true,
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.scss'],
})
export class CarDetailsComponent implements AfterViewInit {
  private cardElement: HTMLElement | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Car,
    private dialogRef: MatDialogRef<CarDetailsComponent>
  ) {}

  ngAfterViewInit() {
    this.updateDialogPositionAndSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateDialogPositionAndSize();
  }

  close() {
    this.dialogRef.close();
  }

  setCardElement(cardElement: HTMLElement) {
    this.cardElement = cardElement;
  }

  private updateDialogPositionAndSize() {
    if (!this.cardElement) return;

    const rect = this.cardElement.getBoundingClientRect();
    this.dialogRef.updateSize(`${rect.width}px`, `${rect.height}px`);
    this.dialogRef.updatePosition({
      top: `${rect.top}px`,
      left: `${rect.left}px`,
    });
  }
}
