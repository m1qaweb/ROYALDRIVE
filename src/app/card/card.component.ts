import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  template: `
    <div
      class="card animate__animated animate__fadeInUp"
      (click)="cardClick.emit()"
    >
      <div class="card-image">
        <img [src]="image" alt="Card image" />
        <div class="view-details">View Details</div>
      </div>
      <div class="card-content">
        <h3>{{ name }}</h3>
        <p>{{ description }}</p>
      </div>
    </div>
  `,
  styles: [
    `
      .card {
        font-family: 'Playfair Display', serif;
        background: white;
        border-radius: 1px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        overflow: hidden;
        transition: transform 0.3s, box-shadow 0.3s;
        cursor: pointer;
        margin: 2rem;
        max-width: 800px;
        perspective: 1200px;
        position: relative;
      }
      .card:hover {
        transform: scale(1.05) rotateY(10deg);
        -webkit-box-shadow: 0px 0px 200px -120px rgba(255, 255, 255, 1);
        -moz-box-shadow: 0px 0px 200px -120px rgba(255, 255, 255, 1);
        box-shadow: 0px 0px 200px -120px rgba(255, 255, 255, 1);
      }
      .card-image {
        height: 384px;
        overflow: hidden;
        filter: brightness(85%);
        position: relative;
        @media (max-width: 590px) {
          width: 300px;
        }
        @media (max-width: 540px) {
          width: 270px;
          height: 300px;
        }
        @media (max-width: 524px) {
          width: 220px;
          height: 250px;
        }
        @media (max-width: 505px) {
          width: 200px;
          height: 230px;
        }
      }
      .card-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s;
      }
      .card:hover .card-image img {
        transform: scale(1.2);
      }
      .view-details {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: white;
        font-size: 1.4rem;
        opacity: 0;
        transition: opacity 0.5s, transform 0.5s;
        text-transform: uppercase;
        letter-spacing: 0.1em;
        white-space: nowrap;
        pointer-events: none;
        @media (max-width: 590px) {
          font-size: 1.2rem;
        }
        @media (max-width: 505px) {
          font-size: 1rem;
        }
      }
      .card:hover .view-details {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1.1);
      }
      .card-content {
        padding: 1.5rem;
        text-align: center;
        width: 340px;
        height: 185px;
        background-color: black;
        background-image: linear-gradient(
            45deg,
            rgba(255, 255, 255, 0.1) 25%,
            transparent 25%
          ),
          linear-gradient(-45deg, rgba(255, 255, 255, 0.1) 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%),
          linear-gradient(-45deg, transparent 75%, rgba(255, 255, 255, 0.1) 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0;
        box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.5);
        @media (max-width: 590px) {
          width: 300px;
          height: 150px;
        }
        @media (max-width: 540px) {
          width: 270px;
        }
        @media (max-width: 524px) {
          width: 220px;
        }
        @media (max-width: 505px) {
          width: 200px;
        }
      }
      .card-content h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
        @media (max-width: 590px) {
          font-size: 1.3rem;
        }
        @media (max-width: 505px) {
          font-size: 1.1rem;
        }
      }
      .card-content p {
        color: #808080;
        font-size: 1.1rem;
        padding: 1rem;
        @media (max-width: 590px) {
          font-size: 1rem;
        }
        @media (max-width: 524px) {
          padding: 0.1rem;
          margin: auto;
        }

        @media (max-width: 505px) {
          font-size: 0.88rem;
        }
      }
      h3 {
        color: white;
        padding: 0.5rem;
      }
    `,
  ],
})
export class CardComponent {
  @Input() name!: string;
  @Input() description!: string;
  @Input() image!: string;
  @Output() cardClick = new EventEmitter<void>();
}
