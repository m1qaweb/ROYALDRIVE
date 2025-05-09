import { Component, HostListener, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
  keyframes,
  state,
} from '@angular/animations';
import { LottieAnimationComponent } from '../lottie-animation/lottie-animation.component';

@Component({
  selector: 'app-customer-gallery',
  standalone: true,
  templateUrl: './customer-gallery.component.html',
  styleUrls: ['./customer-gallery.component.scss'],
  imports: [CommonModule, HttpClientModule, LottieAnimationComponent],
  animations: [
    trigger('gridRoll', [
      transition(':enter', [
        style({ transform: 'rotateY(180deg)', opacity: 0 }),
        animate(
          '1.5s cubic-bezier(0.25, 1, 0.5, 1)',
          style({ transform: 'rotateY(0deg)', opacity: 1 })
        ),
      ]),
    ]),
    trigger('gridAnimation', [
      transition(':enter', [
        query(
          '.grid-item',
          [
            style({ opacity: 0, transform: 'rotateY(180deg)' }),
            stagger('100ms', [
              animate(
                '1s cubic-bezier(0.25, 1, 0.5, 1)',
                keyframes([
                  style({
                    opacity: 0.5,
                    transform: 'rotateY(90deg)',
                    offset: 0.3,
                  }),
                  style({ opacity: 1, transform: 'rotateY(0)', offset: 1 }),
                ])
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
    trigger('overlayImageChange', [
      transition(':increment', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate(
          '0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8)',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
      transition(':decrement', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate(
          '0.5s cubic-bezier(0.47, 1.64, 0.41, 0.8)',
          style({ opacity: 1, transform: 'scale(1)' })
        ),
      ]),
    ]),
    trigger('overlayClose', [
      state(
        'void',
        style({
          opacity: 0,
          transform: 'rotateY(90deg) translateZ(-200px) scale(0.8)',
        })
      ),
      state(
        'open',
        style({ opacity: 1, transform: 'rotateY(0) translateZ(0) scale(1)' })
      ),
      state(
        'close',
        style({
          opacity: 0,
          transform: 'rotateY(90deg) translateZ(-200px) scale(0.8)',
        })
      ),
      transition('void => open', [
        animate(
          '0.8s ease-in-out',
          keyframes([
            style({
              opacity: 0,
              transform: 'rotateY(90deg) translateZ(-200px) scale(0.8)',
              offset: 0,
            }),
            style({
              opacity: 1,
              transform: 'rotateY(0) translateZ(0) scale(1)',
              offset: 1,
            }),
          ])
        ),
      ]),
      transition('open => close', [
        animate(
          '0.6s ease-in-out',
          keyframes([
            style({
              opacity: 1,
              transform: 'rotateY(0) translateZ(0) scale(1)',
              offset: 0,
            }),
            style({
              opacity: 0,
              transform: 'rotateY(90deg) translateZ(-200px) scale(0.8)',
              offset: 1,
            }),
          ])
        ),
      ]),
    ]),
  ],
})
export class CustomerGalleryComponent implements OnInit, AfterViewInit {
  images: any[] = [];
  overlayImage: any = null;
  currentIndex: number = 0;
  overlayClosing: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadImages();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.images = [...this.images];
    }, 0);
  }

  loadImages(): void {
    this.http.get<any[]>('assets/customer-gallery.json').subscribe(
      (data) => {
        this.images = [];
        setTimeout(() => {
          this.images = data;
        }, 0);
      },
      (error) => {
        console.error('Error loading images:', error);
      }
    );
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent): void {
    if (this.overlayImage) {
      event.preventDefault();
      if (event.deltaY < 0) {
        this.showPreviousImage();
      } else {
        this.showNextImage();
      }
    }
  }

  getItemClass(index: number): string {
    const sizes = ['large', 'medium', 'small'];
    return sizes[index % sizes.length];
  }

  showOverlay(image: any): void {
    this.overlayImage = image;
    this.currentIndex = this.images.indexOf(image);
    this.overlayClosing = false;
  }

  startCloseOverlay(event: Event): void {
    event.stopPropagation();
    this.overlayClosing = true;
  }

  hideOverlay(): void {
    this.overlayImage = null;
  }

  showNextImage(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.overlayImage = this.images[this.currentIndex];
  }

  showPreviousImage(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.overlayImage = this.images[this.currentIndex];
  }

  navigateToHome() {
    const transitionOverlay3 = document.getElementById('transition-overlay3');
    if (transitionOverlay3) {
      transitionOverlay3.classList.add('active');
      setTimeout(() => {
        this.router.navigate(['']).then(() => {
          setTimeout(() => {
            transitionOverlay3.classList.remove('active');
          }, 1500);
        });
      }, 1500);
    }
  }

  onOverlayCloseDone(): void {
    if (this.overlayClosing) {
      this.hideOverlay();
    }
  }
}
