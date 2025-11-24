import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import emailjs from 'emailjs-com';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class ContactComponent {
  contact: ContactForm = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  // ✅ جميع المعرفات صحيحة الآن
  private readonly serviceID = 'service_qt16nif';
  private readonly templateID = 'template_bj6rlae';
  private readonly publicKey = 'a8i39uUo7MgNLTEvF';

  async onSubmit() {
    // تنظيف رقم الهاتف من المسافات
    const cleanedPhone = this.cleanPhoneNumber(this.contact.phone);
    
    // التحقق من صحة جميع الحقول
    if (!this.contact.name || !this.contact.email || !cleanedPhone || !this.contact.message) {
      this.errorMessage = 'يرجى ملء جميع الحقول المطلوبة.';
      return;
    }

    // التحقق من صحة البريد الإلكتروني
    if (!this.isValidEmail(this.contact.email)) {
      this.errorMessage = 'يرجى إدخال بريد إلكتروني صحيح.';
      return;
    }

    // التحقق من صحة رقم الهاتف (سعودي)
    if (!this.isValidSaudiPhone(cleanedPhone)) {
      this.errorMessage = 'يرجى إدخال رقم هاتف سعودي صحيح (مثال: 0512345678).';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    try {
      // إعداد معاملات البريد الإلكتروني
      const templateParams = {
        from_name: this.contact.name,
        from_email: this.contact.email,
        phone: cleanedPhone,
        message: this.contact.message,
        name: this.contact.name,
        time: new Date().toLocaleString('ar-SA', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        }),
        date: new Date().toLocaleDateString('ar-SA'),
        company_name: 'Alaien Company'
      };

      console.log('Sending email with params:', templateParams);

      // إرسال البريد الإلكتروني عبر EmailJS
      const response = await emailjs.send(this.serviceID, this.templateID, templateParams, this.publicKey);
      
      console.log('Email sent successfully:', response);
      
      // رسالة النجاح
      this.successMessage = 'تم إرسال رسالتك بنجاح! سنتواصل معك خلال 3 ساعات.';
      
      // إعادة تعيين النموذج
      this.resetForm();

    } catch (error) {
      console.error('Error sending email:', error);
      this.errorMessage = 'حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.';
    } finally {
      this.isSubmitting = false;
    }
  }

  /**
   * التحقق من صحة البريد الإلكتروني
   */
  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  /**
   * التحقق من صحة رقم الهاتف السعودي
   */
  private isValidSaudiPhone(phone: string): boolean {
    const saudiPhoneRegex = /^(05)([0-9]{8})$/;
    return saudiPhoneRegex.test(phone);
  }

  /**
   * تنظيف رقم الهاتف من المسافات
   */
  private cleanPhoneNumber(phone: string): string {
    return phone.replace(/\s/g, '').replace(/[^\d]/g, '');
  }

  /**
   * إعادة تعيين النموذج
   */
  private resetForm(): void {
    this.contact = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  }
}