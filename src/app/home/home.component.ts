import {
  Component,
  HostListener,
  AfterViewInit,
  Renderer2,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BackgroundVideoComponent } from '../background-video/background-video.component';
import { LottieAnimationComponent } from '../lottie-animation/lottie-animation.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from '../menu/menu.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    CommonModule,
    BackgroundVideoComponent,
    LottieAnimationComponent,
    RouterModule,
    MenuComponent,
  ],
})
export class HomeComponent implements AfterViewInit {
  currentSection: number = 0;
  sections!: NodeListOf<HTMLElement>;
  private isScrolling = false;
  public isMainRoute = false;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngAfterViewInit() {
    this.sections = document.querySelectorAll(
      '.section'
    ) as NodeListOf<HTMLElement>;
    this.scrollToCurrentSection();
    this.observeSections();
    this.updateIndicators();
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    if (this.isScrolling) return;

    this.isScrolling = true;
    setTimeout(() => (this.isScrolling = false), 1500);

    if (event.deltaY > 0) {
      this.nextSection();
    } else {
      this.previousSection();
    }
  }

  private nextSection() {
    if (this.currentSection < this.sections.length - 1) {
      this.showTransitionOverlay(() => {
        this.currentSection++;
        this.scrollToCurrentSection();
        this.updateIndicators();
      });
    }
  }

  private previousSection() {
    if (this.currentSection > 0) {
      this.showTransitionOverlay(() => {
        this.currentSection--;
        this.scrollToCurrentSection();
        this.updateIndicators();
      });
    }
  }

  private scrollToCurrentSection() {
    this.sections.forEach((section, index) => {
      section.style.opacity = '0';
      section.style.transform = 'translateY(100vh)';
      section.style.visibility = 'hidden';
      section.style.zIndex = '1';

      if (section.id === 'menu-s') {
        section.classList.remove('active');
      }
    });

    const currentSectionElement = this.sections[
      this.currentSection
    ] as HTMLElement;
    currentSectionElement.style.visibility = 'visible';
    currentSectionElement.style.zIndex = '2';
    currentSectionElement.style.transform = 'translateY(0)';
    currentSectionElement.style.opacity = '1';

    if (currentSectionElement.id === 'menu-s') {
      setTimeout(() => {
        currentSectionElement.classList.add('active');
      }, 50);
    }
  }

  private observeSections() {
    this.sections.forEach((section, index) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              section.classList.add('in-view');
              if (section.id === 'menu-s') {
                section.classList.add('active');
              }
            } else {
              section.classList.remove('in-view');
              if (section.id === 'menu-s') {
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
      const indicatorElement = indicator as HTMLElement;
      if (index === this.currentSection) {
        indicatorElement.classList.add('active');
      } else {
        indicatorElement.classList.remove('active');
      }
    });
  }

  private showTransitionOverlay(callback: () => void) {
    const overlay = document.getElementById('transition-overlay');
    const currentSectionElement = this.sections[
      this.currentSection
    ] as HTMLElement;

    if (overlay) {
      overlay.style.transform = 'translateY(100%)';
      overlay.style.opacity = '1';
      overlay.style.transition =
        'transform 1s ease-in-out, opacity 1s ease-in-out';

      currentSectionElement.style.opacity = '0.5';

      setTimeout(() => {
        overlay.style.transform = 'translateY(0)';

        setTimeout(() => {
          currentSectionElement.style.opacity = '0';
          currentSectionElement.style.visibility = 'hidden';

          callback();

          const nextSectionElement = this.sections[
            this.currentSection
          ] as HTMLElement;
          nextSectionElement.style.visibility = 'visible';
          nextSectionElement.style.opacity = '0';
          nextSectionElement.style.transition = 'opacity 1s ease-in-out';
          setTimeout(() => {
            nextSectionElement.style.opacity = '1';
          }, 50);

          overlay.style.transition = 'none';
          overlay.style.transform = 'translateY(100%)';
          overlay.style.opacity = '0';

          setTimeout(() => {
            overlay.style.transition =
              'transform 1s ease-in-out, opacity 1s ease-in-out';
            currentSectionElement.style.opacity = '1';
          }, 100);
        }, 1000);
      }, 300);
    } else {
      callback();
    }
  }
}
