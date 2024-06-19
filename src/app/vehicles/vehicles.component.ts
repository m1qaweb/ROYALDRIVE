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
  slideWidth: number = 100 / 3;
  private carouselInterval: any;

  private modelImageMap: { [key: string]: string } = {
    'Audi Q5': 'assets/images/audi-q5.jpg',
    'Chevrolet Tahoe': 'assets/images/chevrolet-tahoe.jpg',
    'Subaru Outback': 'assets/images/subaru-outback.jpg',
    'Lexus RX 350': 'assets/images/lexus-rx-350.jpg',
    'BMW 3 Series': 'assets/images/bmw-3-series.jpg',
    'Tesla Model 3': 'assets/images/tesla-model-3.jpg',
    'Toyota Corolla': 'assets/images/toyota-corolla.jpg',
    'Ford Mustang': 'assets/images/ford-mustang.jpg',
    'Nissan Altima': 'assets/images/nissan-altima.jpg',
    'Mercedes-Benz E-Class': 'assets/images/mercedes-benz.jpg',
    'Honda Civic': 'assets/images/honda-civic.jpg',
    'Chevrolet Equinox': 'assets/images/chevrolet-equinox.jpg',
  };

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
        this.carouselItems = cars.slice(0, 12).map((car) => ({
          ...car,
          image:
            this.modelImageMap[`${car.make} ${car.model}`] ||
            'default-image-path.jpg',
        }));
        this.prepareDisplayedItems();
      },
      (error) => {
        console.error('Error fetching car data:', error);
      }
    );
  }

  private prepareDisplayedItems() {
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
    this.carouselInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  stopCarousel() {
    clearInterval(this.carouselInterval);
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

  viewDetails(car: Car, event: MouseEvent) {
    const target = event.target as HTMLElement;
    const cardElement = target.closest('.card') as HTMLElement;

    if (cardElement) {
      const rect = cardElement.getBoundingClientRect();
      this.stopCarousel();
      const dialogRef = this.dialog.open(CarDetailsComponent, {
        data: car,
        panelClass: 'custom-dialog-container',
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        position: {
          top: `${rect.top}px`,
          left: `${rect.left}px`,
        },
        backdropClass: 'transparent-backdrop',
      });

      dialogRef.componentInstance.setCardElement(cardElement);

      dialogRef.afterClosed().subscribe(() => {
        this.startCarousel();
      });
    }
  }
}
