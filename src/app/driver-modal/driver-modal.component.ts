import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  HostListener,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { PopupComponent } from '../popup/popup.component';

@Component({
  standalone: true,
  selector: 'app-driver-modal',
  templateUrl: './driver-modal.component.html',
  styleUrls: ['./driver-modal.component.scss'],
  imports: [CommonModule, PopupComponent],
  animations: [
    trigger('modalAnimation', [
      state(
        'void',
        style({ transform: 'translateY(-50%) scale(0.9)', opacity: 0 })
      ),
      state(
        'enter',
        style({ transform: 'translateY(0) scale(1)', opacity: 1 })
      ),
      transition('void => enter', [animate('300ms ease-out')]),
      transition('enter => void', [animate('300ms ease-in')]),
    ]),
    trigger('backdropAnimation', [
      state('void', style({ opacity: 0 })),
      state('enter', style({ opacity: 0.5 })),
      transition('void => enter', [animate('300ms ease-out')]),
      transition('enter => void', [animate('300ms ease-in')]),
    ]),
  ],
})
export class DriverModalComponent implements AfterViewInit {
  @Input() driver: any;
  @Input() cardElement: HTMLElement | null = null;
  @Output() close = new EventEmitter<void>();
  @Output() hireNowClicked = new EventEmitter<void>();
  modalStyle: any = {};
  modalState = 'enter';

  ngAfterViewInit() {
    this.updateModalPositionAndSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updateModalPositionAndSize();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.closeModal();
  }

  closeModal() {
    this.modalState = 'void';
    setTimeout(() => {
      this.close.emit();
    }, 300);
  }

  private updateModalPositionAndSize() {
    if (!this.cardElement) return;

    const rect = this.cardElement.getBoundingClientRect();
    const reducedWidth = rect.width * 0.845;
    const reducedHeight = rect.height * 0.91;
    const top = rect.top + (rect.height - reducedHeight) / 2;
    const left = rect.left + (rect.width - reducedWidth) / 2;

    this.modalStyle = {
      top: `${top}px`,
      left: `${left}px`,
      width: `${reducedWidth}px`,
      height: `${reducedHeight}px`,
    };
  }

  openPopup() {
    this.hireNowClicked.emit();
  }
}
