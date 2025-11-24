import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-floating-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './floating-buttons.component.html',
  styleUrls: ['./floating-buttons.component.css']
})
export class FloatingButtonsComponent {
  // WhatsApp contact number - replace with actual number
  whatsappNumber = '+966123456789';

  // Phone number for direct calls - replace with actual number
  phoneNumber = '+966123456789';

  openWhatsApp(): void {
    const message = 'مرحباً، أود الاستفسار عن خدماتكم'; // "Hello, I would like to inquire about your services"
    const whatsappUrl = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  }

  makeCall(): void {
    window.location.href = `tel:${this.phoneNumber}`;
  }
}
