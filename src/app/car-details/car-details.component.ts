import { Component, Inject, HostListener, AfterViewInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

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
  imports: [CommonModule],
  animations: [
    trigger('modalAnimation', [
      state(
        'void',
        style({
          transform: 'translateY(-50%) scale(0.9)',
          opacity: 0,
          backgroundColor: 'black',
        })
      ),
      state(
        'enter',
        style({
          transform: 'translateY(0) scale(1)',
          opacity: 1,
          backgroundColor: 'black',
        })
      ),
      transition('void => enter', [animate('200ms ease-out')]),
      transition('enter => void', [animate('200ms ease-in')]),
    ]),
    trigger('backdropAnimation', [
      state('void', style({ opacity: 0 })),
      state('enter', style({ opacity: 0.5 })),
      transition('void => enter', [animate('200ms ease-out')]),
      transition('enter => void', [animate('200ms ease-in')]),
    ]),
  ],
})
export class CarDetailsComponent implements AfterViewInit {
  private cardElement: HTMLElement | null = null;
  modalState = 'enter';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Car,
    private dialogRef: MatDialogRef<CarDetailsComponent>
  ) {
    dialogRef.disableClose = true;
  }

  ngAfterViewInit() {
    this.updateDialogPositionAndSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateDialogPositionAndSize();
  }

  close() {
    this.modalState = 'void';
    setTimeout(() => {
      this.dialogRef.close();
    }, 300);
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
