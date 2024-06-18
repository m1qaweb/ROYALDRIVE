import {
  Component,
  AfterViewInit,
  Renderer2,
  ElementRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { LottieAnimationComponent } from '../lottie-animation/lottie-animation.component';
import { CarService } from '../car.service';
import { CarDetailsComponent } from '../car-details/car-details.component';

interface Car {
  id: number;
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
  image: string;
}

@Component({
  selector: 'app-vehicles',
  standalone: true,
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  imports: [
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    LottieAnimationComponent,
  ],
})
export class VehiclesComponent implements OnInit, AfterViewInit {
  currentSlide: number = 0;
  carouselItems: Car[] = [];
  displayedItems: Car[] = [];
  slideWidth: number = 100 / 3; // Assuming 3 slides visible at once

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router,
    private carService: CarService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.fetchCars();
  }

  ngAfterViewInit() {
    this.startCarousel();
  }

  private fetchCars() {
    this.carService.getCars().subscribe(
      (cars) => {
        this.carouselItems = cars.slice(0, 12); // Only get the first 12 cars
        this.prepareDisplayedItems();
      },
      (error) => {
        console.error('Error fetching car data:', error);
      }
    );
  }

  private prepareDisplayedItems() {
    // Clone the original items to simulate infinite looping
    this.displayedItems = [
      ...this.carouselItems,
      ...this.carouselItems,
      ...this.carouselItems,
    ];
    setTimeout(() => {
      this.cloneCarouselItems();
    });
  }

  private cloneCarouselItems() {
    const carouselInner =
      this.el.nativeElement.querySelector('.carousel-inner');
    const firstItems = Array.from(carouselInner.children).slice(0, 3);
    const lastItems = Array.from(carouselInner.children).slice(-3);

    firstItems.forEach((item) => {
      const clone = (item as HTMLElement).cloneNode(true) as HTMLElement;
      carouselInner.appendChild(clone);
    });

    lastItems.reverse().forEach((item) => {
      const clone = (item as HTMLElement).cloneNode(true) as HTMLElement;
      carouselInner.insertBefore(clone, carouselInner.firstChild);
    });
  }

  startCarousel() {
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    const carouselInner =
      this.el.nativeElement.querySelector('.carousel-inner');
    if (!carouselInner) return;

    this.currentSlide++;
    carouselInner.style.transition = 'transform 0.8s ease-in-out';
    carouselInner.style.transform = `translateX(-${
      (this.currentSlide + 3) * this.slideWidth
    }%)`;

    if (this.currentSlide >= this.carouselItems.length) {
      setTimeout(() => {
        carouselInner.style.transition = 'none';
        this.currentSlide = 0;
        carouselInner.style.transform = `translateX(-${3 * this.slideWidth}%)`;
      }, 800);
    }
  }

  navigateToHome() {
    const transitionOverlay3 = document.getElementById('transition-overlay3');
    if (transitionOverlay3) {
      transitionOverlay3.classList.add('active');
      setTimeout(() => {
        this.router.navigate(['']).then(() => {
          setTimeout(() => {
            transitionOverlay3.classList.remove('active');
          }, 1000);
        });
      }, 1000);
    }
  }

  viewDetails(car: Car) {
    this.dialog.open(CarDetailsComponent, {
      data: car,
    });
  }
}
