import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  imports: [CommonModule],
})
export class PopupComponent implements OnInit, OnDestroy {
  @Input() message: string | null = null;
  @Input() type: 'success' | 'error' = 'success';
  @Output() close = new EventEmitter<void>();

  countdown: number = 4;
  private countdownInterval: any;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.countdown -= 1;
      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.closePopup();
      }
    }, 1000);
  }

  closePopup() {
    this.close.emit();
  }
}
