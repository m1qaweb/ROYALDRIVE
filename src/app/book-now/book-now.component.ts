import { Component, Input, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { PopupComponent } from '../popup/popup.component';

interface Car {
  make: string;
  model: string;
  price: number;
}

type Sections = {
  customerInfo: boolean;
  paymentOptions: boolean;
};

@Component({
  standalone: true,
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.scss'],
  imports: [CommonModule, PopupComponent],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition(':enter, :leave', [animate('300ms ease-in-out')]),
    ]),
    trigger('collapse', [
      state('expanded', style({ height: '*', opacity: 1, padding: '10px 0' })),
      state('collapsed', style({ height: '0px', opacity: 0, padding: '0 0' })),
      transition('expanded <=> collapsed', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class BookNowComponent implements OnInit {
  @Input() data!: Car;
  isExpired = false;
  sections: Sections = {
    customerInfo: true,
    paymentOptions: false,
  };
  popupMessage: string | null = null;
  popupType: 'success' | 'error' = 'success';
  showPopupFlag = false;

  ngOnInit() {
    this.loadCustomerInfo();
  }

  handlePayment(event: Event) {
    event.preventDefault();
    const cardNumber = (
      document.getElementById('cardNumber') as HTMLInputElement
    ).value.replace(/\s/g, '');
    if (this.isExpired) {
      this.showPopup('Please enter a valid expiry date.', 'error');
    } else if (cardNumber.length !== 16) {
      this.showPopup('Card number must be 16 digits long.', 'error');
    } else {
      const formData = new FormData(event.target as HTMLFormElement);
      const customerDetails = {
        salutation: formData.get('salutation'),
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phoneNumber: formData.get('phoneNumber'),
        cardholderName: formData.get('cardholderName'),
        cardNumber,
        expiryDate: formData.get('expiryDate'),
        cvc: formData.get('cvc'),
      };
      console.log('Payment successful!', customerDetails);
      this.showPopup('Payment successful!', 'success');
      setTimeout(() => {
        this.close();
      }, 3000);
    }
  }

  showPopup(message: string, type: 'success' | 'error') {
    this.popupMessage = message;
    this.popupType = type;
    this.showPopupFlag = true;
  }

  closePopup() {
    this.showPopupFlag = false;
    if (this.popupType === 'success') {
      this.close();
    }
  }

  close() {
    this.saveCustomerInfo();
    const bookNowElement = document.getElementById('book-now');
    if (bookNowElement) {
      bookNowElement.remove();
    }
  }

  @HostListener('input', ['$event'])
  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (
      inputElement.id === 'fullName' ||
      inputElement.id === 'cardholderName'
    ) {
      inputElement.value = inputElement.value.replace(/[^a-zA-Z\s]/g, '');
    }

    if (inputElement.id === 'cardNumber') {
      inputElement.value = inputElement.value
        .replace(/\D/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
    }

    if (inputElement.id === 'cvc') {
      inputElement.value = inputElement.value.replace(/\D/g, '').slice(0, 3);
    }

    if (inputElement.id === 'phoneNumber') {
      inputElement.value = inputElement.value
        .replace(/\D/g, '')
        .replace(/(.{3})/g, '$1 ')
        .trim()
        .slice(0, 19);
    }

    if (inputElement.id === 'expiryDate') {
      let input = inputElement.value.replace(/\D/g, '');
      if (input.length <= 2) {
        if (input.length === 1 && parseInt(input, 10) > 1) {
          input = '0' + input;
        }
        if (parseInt(input, 10) > 12) {
          input = '12';
        }
        inputElement.value = input;
      } else if (input.length > 2 && input.length <= 4) {
        let month = input.slice(0, 2);
        const year = input.slice(2, 4);
        if (parseInt(month, 10) > 12) {
          month = '12';
        }
        inputElement.value = month + '/' + year;
        if (year.length === 2) {
          this.isExpired = parseInt(year, 10) < 24;
        } else {
          this.isExpired = false;
        }
      } else {
        inputElement.value = input.slice(0, 2) + '/' + input.slice(2, 4);
      }
    }

    this.checkCustomerInfoValidity();
  }

  checkCustomerInfoValidity() {
    const salutation = (
      document.querySelector(
        'input[name="salutation"]:checked'
      ) as HTMLInputElement
    )?.value;
    const fullName = (document.getElementById('fullName') as HTMLInputElement)
      ?.value;
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const phoneNumber = (
      document.getElementById('phoneNumber') as HTMLInputElement
    )?.value;

    if (salutation && fullName && email && phoneNumber) {
      this.sections.paymentOptions = true;
    }
  }

  saveCustomerInfo() {
    const salutation = (
      document.querySelector(
        'input[name="salutation"]:checked'
      ) as HTMLInputElement
    )?.value;
    const fullName = (document.getElementById('fullName') as HTMLInputElement)
      ?.value;
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const phoneNumber = (
      document.getElementById('phoneNumber') as HTMLInputElement
    )?.value;

    const customerInfo = { salutation, fullName, email, phoneNumber };
    localStorage.setItem('customerInfo', JSON.stringify(customerInfo));
  }

  loadCustomerInfo() {
    const customerInfo = JSON.parse(
      localStorage.getItem('customerInfo') || '{}'
    );
    if (customerInfo) {
      (document.getElementById('fullName') as HTMLInputElement).value =
        customerInfo.fullName || '';
      (document.getElementById('email') as HTMLInputElement).value =
        customerInfo.email || '';
      (document.getElementById('phoneNumber') as HTMLInputElement).value =
        customerInfo.phoneNumber || '';
      if (customerInfo.salutation) {
        (
          document.querySelector(
            `input[name="salutation"][value="${customerInfo.salutation}"]`
          ) as HTMLInputElement
        ).checked = true;
      }
      this.checkCustomerInfoValidity();
    }
  }
}
