/**
 * Logo Carousel Component
 * Static display of company logos without animations
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface LogoItem {
  src: string;
  alt: string;
  id: number;
}

@Component({
  selector: 'app-logo-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './logo-carousel.component.html',
  styleUrls: ['./logo-carousel.component.css']
})
export class LogoCarouselComponent {
  logos: LogoItem[] = [
    { src: 'assets/images/logo/1.png', alt: 'Logo 1', id: 1 },
    { src: 'assets/images/logo/2.png', alt: 'Logo 2', id: 2 },
    { src: 'assets/images/logo/3.png', alt: 'Logo 3', id: 3 },
    { src: 'assets/images/logo/4.png', alt: 'Logo 4', id: 4 },
    { src: 'assets/images/logo/5.png', alt: 'Logo 5', id: 5 }
  ];

  /**
   * TrackBy function for ngFor optimization
   * @param index The index of the item
   * @param item The logo item
   * @returns The unique identifier for the item
   */
  trackByFn(index: number, item: LogoItem): number {
    return item.id;
  }

  /**
   * Handles image loading errors
   * @param event The error event
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.warn(`Failed to load logo image: ${img.src}`);
    // Could implement fallback image logic here
  }
}
