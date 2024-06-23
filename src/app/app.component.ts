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
  public isDriversRoute = false;
  public isCustomerRoute = false;
  public isMainRoute = false;
  private navigationSubscription!: Subscription;

  constructor(private renderer: Renderer2, private router: Router) {}

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isVehiclesRoute = event.urlAfterRedirects === '/vehicles';
        this.isMainRoute = event.urlAfterRedirects === '/';
        this.isDriversRoute = event.urlAfterRedirects === '/drivers';
        this.isCustomerRoute = event.urlAfterRedirects === '/customer-gallery';

        if (
          this.isVehiclesRoute ||
          this.isDriversRoute ||
          this.isCustomerRoute
        ) {
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

    this.hideLoadingScreen();
  }

  ngOnDestroy() {
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
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
}
