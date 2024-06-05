import { Component, AfterViewInit, ElementRef } from '@angular/core';
import lottie from 'lottie-web';

@Component({
  selector: 'app-lottie-animation',
  template: '<div id="animation-container"></div>',
  standalone: true,
})
export class LottieAnimationComponent implements AfterViewInit {
  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    lottie.loadAnimation({
      container: this.el.nativeElement.querySelector('#animation-container'),
      renderer: 'svg',
      loop: true,
      autoplay: true,
      path: 'assets/animations/mouse.json',
    });
  }
}
