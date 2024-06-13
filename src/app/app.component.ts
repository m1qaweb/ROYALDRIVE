import { Component, HostListener, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BackgroundVideoComponent } from './background-video/background-video.component';
import { LottieAnimationComponent } from './lottie-animation/lottie-animation.component';

interface Car {
  brand: string;
  image: string;
  price: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [
    HeaderComponent,
    FooterComponent,
    CommonModule,
    BackgroundVideoComponent,
    LottieAnimationComponent,
  ],
})
export class AppComponent implements AfterViewInit {
  currentSection: number = 0;
  sections!: NodeListOf<HTMLElement>;
  currentSlide: number = 0;
  carouselItems: Car[] = [
    {
      brand: 'BMW',
      image: 'assets/images/bmw.jpg',
      price: '$50,000',
    },
    {
      brand: 'Audi',
      image: 'assets/images/audi.jpg',
      price: '$60,000',
    },
    {
      brand: 'Mercedes',
      image: 'assets/images/mercedes.jpg',
      price: '$70,000',
    },
    {
      brand: 'Tesla',
      image: 'assets/images/tesla.jpg',
      price: '$80,000',
    },
    {
      brand: 'Porsche',
      image: 'assets/images/porsche.jpg',
      price: '$90,000',
    },
  ];

  ngAfterViewInit() {
    this.sections = document.querySelectorAll(
      '.section'
    ) as NodeListOf<HTMLElement>;
    this.scrollToCurrentSection();
    this.cloneCarouselItems();
    this.startCarousel();
    this.observeSections();
    this.updateIndicators();
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (event.deltaY > 0) {
      this.nextSection();
    } else {
      this.previousSection();
    }
  }

  private nextSection() {
    if (this.currentSection < this.sections.length - 1) {
      this.currentSection++;
      this.scrollToCurrentSection();
      this.updateIndicators();
    }
  }

  private previousSection() {
    if (this.currentSection > 0) {
      this.currentSection--;
      this.scrollToCurrentSection();
      this.updateIndicators();
    }
  }

  private scrollToCurrentSection() {
    this.sections.forEach((section, index) => {
      section.style.opacity = index === this.currentSection ? '1' : '0';
      section.style.transform =
        index === this.currentSection
          ? 'translateY(0)'
          : index < this.currentSection
          ? 'translateY(-100vh)'
          : 'translateY(100vh)';
      section.style.transition =
        'opacity 1s ease-in-out, transform 1s ease-in-out';
      this.toggleDarkOverlay(section, index);
    });
  }

  private toggleDarkOverlay(section: HTMLElement, index: number) {
    const overlay = section.querySelector('.dark-overlay') as HTMLElement;
    if (overlay) {
      overlay.style.opacity = index === this.currentSection - 1 ? '1' : '0';
    }
  }

  private cloneCarouselItems() {
    const carouselInner = document.querySelector(
      '.carousel-inner'
    ) as HTMLElement;
    const firstItems = Array.from(carouselInner.children).slice(0, 3);
    const lastItems = Array.from(carouselInner.children).slice(-3);

    firstItems.forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      carouselInner.appendChild(clone);
    });

    lastItems.reverse().forEach((item) => {
      const clone = item.cloneNode(true) as HTMLElement;
      carouselInner.insertBefore(clone, carouselInner.firstChild);
    });
  }

  startCarousel() {
    setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    const carouselInner = document.querySelector(
      '.carousel-inner'
    ) as HTMLElement;
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

  private observeSections() {
    this.sections.forEach((section, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              if (index === 1) {
                section.classList.add('in-view');
              } else if (index === 2) {
                section.classList.add('active');
              }
            } else {
              if (index === 1) {
                section.classList.remove('in-view');
              } else if (index === 2) {
                section.classList.remove('active');
              }
            }
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(section);
    });
  }

  private updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      if (index === this.currentSection) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
}
