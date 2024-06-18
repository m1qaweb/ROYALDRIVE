import { Component, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LottieAnimationComponent } from '../lottie-animation/lottie-animation.component';

interface Car {
  brand: string;
  image: string;
  price: string;
}

@Component({
  selector: 'app-vehicles',
  standalone: true,
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss'],
  imports: [CommonModule, HttpClientModule, LottieAnimationComponent],
})
export class VehiclesComponent implements AfterViewInit {
  currentSlide: number = 0;
  carouselItems: Car[] = [
    { brand: 'BMW', image: 'assets/images/bmw.jpg', price: '$50,000' },
    { brand: 'Audi', image: 'assets/images/audi.jpg', price: '$60,000' },
    {
      brand: 'Mercedes',
      image: 'assets/images/mercedes.jpg',
      price: '$70,000',
    },
    { brand: 'Tesla', image: 'assets/images/tesla.jpg', price: '$80,000' },
    { brand: 'Porsche', image: 'assets/images/porsche.jpg', price: '$90,000' },
  ];

  constructor(
    private renderer: Renderer2,
    private el: ElementRef,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.cloneCarouselItems();
    this.startCarousel();
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
      (this.currentSlide + 3) * (100 / 3)
    }%)`;

    if (this.currentSlide === this.carouselItems.length) {
      setTimeout(() => {
        carouselInner.style.transition = 'none';
        this.currentSlide = 0;
        carouselInner.style.transform = `translateX(-${3 * (100 / 3)}%)`;
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
}
