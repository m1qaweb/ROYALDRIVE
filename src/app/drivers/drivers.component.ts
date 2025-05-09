import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LottieAnimationComponent } from '../lottie-animation/lottie-animation.component';
import { CardComponent } from '../card/card.component';
import { DriverService } from '../driver.service';
import { DriverModalComponent } from '../driver-modal/driver-modal.component';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-drivers',
  standalone: true,
  imports: [
    CommonModule,
    LottieAnimationComponent,
    CardComponent,
    DriverModalComponent,
    PopupComponent,
  ],
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.scss'],
})
export class DriversComponent {
  constructor(private router: Router, private driverService: DriverService) {}

  cards = [
    {
      name: 'Alexander',
      description: '4 Years of Experience',
      image: '/assets/images/driver-1.jpeg',
    },
    {
      name: 'Chadwick',
      description: '7 Years of Experience',
      image: '/assets/images/driver-2.jpeg',
    },
    {
      name: 'Lasha',
      description: '10 Years of Experience',
      image: '/assets/images/driver-3.jpeg',
    },
    {
      name: 'Dakari',
      description: '5 Years of Experience',
      image: '/assets/images/driver-4.jpeg',
    },
    {
      name: 'Franklin',
      description: '6 Years of Experience',
      image: '/assets/images/driver-5.jpeg',
    },
    {
      name: 'Bo',
      description: '3 Years of Experience',
      image: '/assets/images/driver-6.jpeg',
    },
    {
      name: 'Diego',
      description: '7 Years of Experience',
      image: '/assets/images/driver-7.jpeg',
    },
    {
      name: 'Hakeem',
      description: '1 Years of Experience',
      image: '/assets/images/driver-8.jpeg',
    },
    {
      name: 'Edward',
      description: '3 Years of Experience',
      image: '/assets/images/driver-9.jpeg',
    },
    {
      name: 'Chad',
      description: '8 Years of Experience',
      image: '/assets/images/driver-10.jpeg',
    },
    {
      name: 'Demetre',
      description: '20 Years of Experience',
      image: '/assets/images/driver-11.jpeg',
    },
  ];

  selectedDriver: any = null;
  cardElement: HTMLElement | null = null;
  showPopupFlag: boolean = false;
  popupMessage: string | null = null;
  popupType: 'success' | 'error' = 'success';
  showPopup() {
    this.showPopupFlag = true;
    this.popupMessage = `${this.selectedDriver.name} has been hired to be at your service!`;
    this.popupType = 'success';
  }

  closePopup() {
    this.showPopupFlag = false;
  }

  onCardClicked(index: number, event: Event) {
    const cardData = this.cards[index];
    this.cardElement = event.currentTarget as HTMLElement;

    this.driverService.getUser(index + 1).subscribe((driver) => {
      this.selectedDriver = { ...driver, name: cardData.name };
    });
  }

  closeModal() {
    this.selectedDriver = null;
  }

  @HostListener('window:wheel', ['$event'])
  onScroll(event: WheelEvent) {
    const container = document.querySelector('.cards-container');
    if (container) {
      if (event.deltaY > 0) {
        container.scrollLeft += 100;
      } else {
        container.scrollLeft -= 100;
      }
    }
    this.closeModal();
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
}
