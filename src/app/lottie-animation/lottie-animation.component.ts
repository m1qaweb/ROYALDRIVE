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
  `,
  styleUrls: ['./lottie-animation.component.scss'],
  standalone: true,
  imports: [CommonModule],
})
export class LottieAnimationComponent implements AfterViewInit {
  @Input() animationType: 'container' | 'arrow' | 'scroll' = 'container';

  showContainer = false;
  showArrow = false;
  showScroll = false;

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
  }
}
