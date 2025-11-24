import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceCategory {
  category: string;
  services: string[];
}

@Component({
  selector: 'app-services-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services-bar.html',
  styleUrl: './services-bar.css'
})
export class ServicesBarComponent implements OnInit, OnDestroy {
  servicesByCategory: ServiceCategory[] = [
    {
      category: 'كاميرات ومراقبة',
      services: [
        'كاميرات مراقبة (CCTV/IP/PTZ)',
        'مسجلات NVR / DVR',
        'تحليل فيديو وذكاء اصطناعي (ANPR/VCA)',
        'اختبار وصيانة الكاميرات'
      ]
    },
    {
      category: 'أنظمة إنذار وحماية',
      services: [
        'حساسات حركة وأبواب ونوافذ',
        'لوحات إنذار الحريق ومكامن الدخان',
        'أنظمة إنذار اقتحام (Intrusion Detection)',
        'أقفال ذكية (Smart Locks)',
        'بوابات إلكترونية وإنتركم صوتي ومرئي'
      ]
    },
    {
      category: 'شبكات واتصالات',
      services: [
        'تصميم وتنفيذ شبكات Wi‑Fi ونقاط وصول (APs)',
        'مفاتيح وشبكات LAN / VLAN',
        'راوترات وجدران نارية (Routers & Firewalls)',
        'كابلات هيكلية وأرفف سيرفر (Structured Cabling & Racks)',
        'خوادم صغيرة وأنظمة الطاقة الاحتياطية (UPS/PoE)',
        'شبكات الفايبر البصرية (Fiber Optic)',
        'إعدادات QoS، VPN، VOIP، وتأمين الشبكات'
      ]
    },
    {
      category: 'صوتيات وأنظمة إعلامية',
      services: [
        'نظام الصوت العام (PA) والإعلان الطارئ',
        'توزيع صوت وموسيقى خلفية (BGM)',
        'خدمات توصيل محتوى داخلي (IPTV / Digital Signage)'
      ]
    },
    {
      category: 'أنظمة ذكية ومتكاملة',
      services: [
        'تحكم دخول إلكتروني وبصمة',
        'أنظمة التحكم بالمباني (BMS/BAS)',
        'حلول إنترنت الأشياء (IoT) للأتمتة',
        'تكامل أنظمة الأمن (CCTV + Access + Alarm)',
        'الصيانة الدورية والدعم الفني'
      ]
    }
  ];

  currentCategoryIndex = 0;
  currentCategory: ServiceCategory = this.servicesByCategory[0];
  private intervalId: any;

  ngOnInit() {
    this.startCategoryRotation();
  }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startCategoryRotation() {
    this.intervalId = setInterval(() => {
      this.currentCategoryIndex = (this.currentCategoryIndex + 1) % this.servicesByCategory.length;
      this.currentCategory = this.servicesByCategory[this.currentCategoryIndex];
    }, 8000); // Change category every 8 seconds
  }

  get animationDuration(): string {
    return '60s';
  }
}
