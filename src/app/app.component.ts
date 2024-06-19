import {
  Component,
  AfterViewInit,
  Renderer2,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { BackgroundVideoComponent } from './background-video/background-video.component';
import { LottieAnimationComponent } from './lottie-animation/lottie-animation.component';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
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
export class AppComponent implements AfterViewInit, OnInit, OnDestroy {
  currentSection: number = 0;
  sections!: NodeListOf<HTMLElement>;

  public isVehiclesRoute = false;
  public isMainRoute = false;
  private navigationSubscription!: Subscription;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isVehiclesRoute = event.urlAfterRedirects === '/vehicles';
        this.isMainRoute = event.urlAfterRedirects === '/';
        if (this.isVehiclesRoute) {
          this.lockScroll();
          this.scrollToMenuS();
        } else {
          this.unlockScroll();
        }
      }
    });
  }

  ngAfterViewInit() {
    this.sections = document.querySelectorAll(
      '.section'
    ) as NodeListOf<HTMLElement>;

    this.observeSections();
    this.updateIndicators();
    this.hideLoadingScreen();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  private observeSections() {
    this.sections.forEach((section) => {
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

  private hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');

    if (loadingScreen) {
      if (!sessionStorage.getItem('loadingScreenDisplayed')) {
        setTimeout(() => {
          this.renderer.addClass(document.body, 'loaded');

          const fullPage = document.getElementById('fullpage');
          if (fullPage) {
            fullPage.classList.remove('hidden');
          }
        }, 3500);

        setTimeout(() => {
          if (loadingScreen) {
            loadingScreen.style.display = 'none';
          }
          sessionStorage.setItem('loadingScreenDisplayed', 'true');
        }, 4500);
      } else {
        this.renderer.addClass(document.body, 'loaded');
        loadingScreen.style.display = 'none';

        const fullPage = document.getElementById('fullpage');
        if (fullPage) {
          fullPage.classList.remove('hidden');
        }
      }
    }
  }

  private lockScroll() {
    document.body.style.overflow = 'hidden';
  }

  private unlockScroll() {
    document.body.style.overflow = 'auto';
  }

  private scrollToMenuS() {
    const menuSection = document.getElementById('menu-s');
    if (menuSection) {
      menuSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  navigateToVehicles() {
    const transitionOverlay2 = document.getElementById('transition-overlay2');
    const menuSection = document.getElementById('menu-s');

    if (transitionOverlay2 && menuSection) {
      transitionOverlay2.classList.add('active');

      setTimeout(() => {
        menuSection.style.visibility = 'hidden';

        setTimeout(() => {
          window.location.href = '/vehicles';
        }, 1000);
      }, 1000);
    }
  }
}
