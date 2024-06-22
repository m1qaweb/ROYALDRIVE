import {
  Component,
  AfterViewInit,
  ElementRef,
  Input,
  ChangeDetectorRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import lottie from 'lottie-web';

@Component({
  selector: 'app-lottie-animation',
  template: `
    <div id="animation-container" *ngIf="showContainer"></div>
    <div id="animation-arrow" *ngIf="showArrow"></div>
    <div id="animation-scroll" *ngIf="showScroll"></div>
    <div id="animation-mbscroll" *ngIf="showmbScroll"></div>
  `,
  styleUrls: ['./lottie-animation.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LottieAnimationComponent implements AfterViewInit {
  @Input() animationType: 'container' | 'arrow' | 'mbscroll' | 'scroll' =
    'container';

  showContainer = false;
  showArrow = false;
  showScroll = false;
  showmbScroll = false;

  constructor(private el: ElementRef, private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    if (this.animationType === 'container') {
      this.showContainer = true;
      this.cdr.detectChanges();
      lottie.loadAnimation({
        container: this.el.nativeElement.querySelector('#animation-container'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/animations/mouse.json',
      });
    }

    if (this.animationType === 'arrow') {
      this.showArrow = true;
      this.cdr.detectChanges();
      lottie.loadAnimation({
        container: this.el.nativeElement.querySelector('#animation-arrow'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/animations/Arrow-left.json',
      });
    }

    if (this.animationType === 'scroll') {
      this.showScroll = true;
      this.cdr.detectChanges();
      lottie.loadAnimation({
        container: this.el.nativeElement.querySelector('#animation-scroll'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/animations/scroll.json',
      });
    }
    if (this.animationType === 'mbscroll') {
      this.showmbScroll = true;
      this.cdr.detectChanges();
      lottie.loadAnimation({
        container: this.el.nativeElement.querySelector('#animation-mbscroll'),
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: 'assets/animations/swipe-down.json',
      });
    }
  }
}
