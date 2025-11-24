import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Camera, Network, Wrench, ShieldCheck, Flame, DoorClosed, Speaker, Cable, Home, Bell, Lightbulb, Building2 } from 'lucide-angular';

interface Service {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface DetailedService {
  id: number;
  title: string;
  description: string;
  icon: string;
  imageNumber: number;
  types: string[];
  features: string[];
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class ServicesComponent implements OnInit {
  services: Service[] = [];
  loading = false;
  error: string | null = null;
  activeServiceId: number | null = null;

  defaultServices: DetailedService[] = [
    {
      id: 1,
      title: 'حلول المراقبة الذكية',
      description: 'كاميرات UHD، تحليلات ذكية، مراقبة سحابية، وربط كامل مع تطبيقات الجوال.',
      icon: 'video',
      imageNumber: 1,
      types: [
        'كاميرات IP بدقة 4K',
        'كاميرات PTZ متحركة بقدرات تتبع ذكية',
        'كاميرات حرارية للمواقع الحساسة',
        'كاميرات مخفية لتأمين المساحات الحساسة'
      ],
      features: [
        'تحليلات فيديو تعتمد على الذكاء الاصطناعي',
        'تنبيهات فورية عبر التطبيق والجوال',
        'تسجيل سحابي آمن بصلاحيات متعددة'
      ]
    },
    {
      id: 2,
      title: 'أنظمة الصوتيات الاحترافية',
      description: 'تغطية صوتية متوازنة للقاعات والمتاجر مع تحكم مركزي وتوزيع متعدد المناطق.',
      icon: 'volume-up',
      imageNumber: 2,
      types: [
        'أنظمة توزيع الصوت متعددة المناطق',
        'سماعات سقفية وجدارية مخفية',
        'معالجات صوت رقمية Digital DSP',
        'أنظمة صوت للطوارئ والإخلاء'
      ],
      features: [
        'تحكم مركزي عبر واجهة مرئية سهلة',
        'تكامل مع أنظمة المؤتمرات والفيديو',
        'ضبط أوتوماتيكي لمستوى الصوت حسب البيئة'
      ]
    },
    {
      id: 3,
      title: 'البنية التحتية للشبكات',
      description: 'تصميم وتركيب الشبكات السلكية واللاسلكية، غرف الاتصالات، وتنظيم الكوابل الاحترافي.',
      icon: 'network-wired',
      imageNumber: 6,
      types: [
        'شبكات سلكية بسرعة 10 جيجابت',
        'شبكات لاسلكية Wi-Fi 6E',
        'مراكز بيانات مصغرة للشركات',
        'حلول مراقبة الشبكة NMS'
      ],
      features: [
        'مرونة عالية للتوسع المستقبلي',
        'إدارة مركزية مع مراقبة لحظية',
        'تطبيق معايير الأمن السيبراني على طبقات الشبكة'
      ]
    },
    {
      id: 4,
      title: 'حلول السنترال الذكي',
      description: 'سنترالات IP متكاملة مع الرد الآلي وتوزيع المكالمات وربط الفروع عبر السحابة.',
      icon: 'phone-volume',
      imageNumber: 11,
      types: [
        'سنترال IP داخلي للشركات',
        'ربط الفروع عبر السحابة VPN',
        'أنظمة رد آلي IVR متعددة اللغات',
        'تكامل مع تطبيقات CRM ومراكز الاتصال'
      ],
      features: [
        'تقارير تفصيلية لحركة المكالمات',
        'تسجيل المكالمات وتخزينها بأمان',
        'إدارة الامتدادات من لوحة تحكم واحدة'
      ]
    },
    {
      id: 5,
      title: 'أنظمة الحضور والانصراف',
      description: 'حلول موثوقة لتسجيل الدوام وربطها بالموارد البشرية مع دعم التحقق المتعدد.',
      icon: 'user-check',
      imageNumber: 4,
      types: [
        'أجهزة بصمة الأصبع عالية الدقة',
        'تعرّف الوجه ثلاثي الأبعاد',
        'بطاقات وتقنيات RFID/NFC',
        'بوابات مرور ذكية للتحكم في الدخول'
      ],
      features: [
        'تقارير لحظية مع تصدير CSV وExcel',
        'تنبيهات تلقائية للتأخير والغياب',
        'تكامل مباشر مع أنظمة الموارد البشرية'
      ]
    },
    {
      id: 6,
      title: 'حلول الانتركم الذكي',
      description: 'أنظمة إنتركم مرئية وصوتية تربط المداخل بالمكاتب والمرافق بدقة عالية.',
      icon: 'comments',
      imageNumber: 5,
      types: [
        'إنتركم مرئي عالي الدقة للمباني السكنية',
        'لوحات مداخل تعمل باللمس للمجمعات التجارية',
        'أجهزة إنتركم داخلية لاسلكية للمكاتب',
        'حلول إنتركم للمستشفيات والمنشآت الحساسة'
      ],
      features: [
        'تكامل مع أنظمة التحكم في الدخول والمصاعد',
        'أرشفة للمكالمات الصوتية والمرئية',
        'تشغيل من تطبيقات الهواتف الذكية عن بعد'
      ]
    },
    {
      id: 7,
      title: 'مراكز المراقبة والتشغيل',
      description: 'غرف تحكم متكاملة، لوحات مراقبة لحظية، واستجابة ميدانية مدعومة بالذكاء الاصطناعي.',
      icon: 'shield-alt',
      imageNumber: 12,
      types: [
        'مكاتب تحكم بترتيب هندسي مريح',
        'جدران عرض LED متعددة المصادر',
        'منصات إدارة موحدة VMS/PSIM',
        'ترابط مع أنظمة الاستجابة الميدانية'
      ],
      features: [
        'عرض لحظي لجميع الأنظمة المتصلة',
        'لوحات مؤشرات تنفيذية قابلة للتخصيص',
        'سيناريوهات استجابة مؤتمتة ومجدولة'
      ]
    },
    {
      id: 8,
      title: 'القفل الذكي والتحكم في الأبواب',
      description: 'أقفال إلكترونية مؤمنة مع تحكم مركزي وإدارة الصلاحيات للمؤسسات والمنازل.',
      icon: 'lock',
      imageNumber: 21,
      types: [
        'أقفال ذكية تعمل ببصمة الإصبع والوجه',
        'أنظمة تحكم مركزي للأبواب متعددة النقاط',
        'أقفال إلكترونية للفنادق والوحدات السكنية',
        'قفل ذكي متكامل مع أنظمة الإنذار والمراقبة'
      ],
      features: [
        'توليد مفاتيح افتراضية مؤقتة للزوار',
        'سجلات دخول وخروج لحظية مع تقارير',
        'تكامل مع المنصات الذكية Alexa وGoogle Home'
      ]
    },
    {
      id: 9,
      title: 'نظام إنذار الحريق',
      description: 'أنظمة كشف وإنذار الحريق المتقدمة مع استجابة فورية وإخلاء آمن للمباني.',
      icon: 'fire-extinguisher',
      imageNumber: 7,
      types: [
        'أجهزة كشف الدخان والحرارة الذكية',
        'أنظمة إنذار صوتي ومرئي للإخلاء',
        'شبكات ربط مع مراكز الإطفاء والشرطة',
        'أنظمة إطفاء تلقائي متكاملة مع الإنذار'
      ],
      features: [
        'كشف مبكر للحرائق بتقنيات متقدمة',
        'تنبيهات فورية عبر التطبيقات والرسائل النصية',
        'تقارير مفصلة وصيانة دورية للأنظمة'
      ]
    },
    {
      id: 10,
      title: 'نظام إدارة المباني',
      description: 'حلول شاملة لإدارة المباني الذكية مع تحكم في الطاقة والأمان والراحة.',
      icon: 'building',
      imageNumber: 12,
      types: [
        'أنظمة تحكم في الإضاءة والتكييف الذكية',
        'إدارة الطاقة والاستهلاك الكهربائي',
        'مراقبة الصيانة والأعطال في الوقت الفعلي',
        'تكامل مع أنظمة الأمان والمراقبة'
      ],
      features: [
        'توفير الطاقة بنسبة تصل إلى 30%',
        'تحكم مركزي عبر تطبيقات الهواتف',
        'تقارير أداء المبنى وتحسين الكفاءة'
      ]
    },
    {
      id: 11,
      title: 'نظام مواقف السيارات',
      description: 'حلول ذكية لإدارة مواقف السيارات مع حجز مسبق ودفع إلكتروني.',
      icon: 'car',
      imageNumber: 18,
      types: [
        'أنظمة حجز مواقف عبر التطبيقات',
        'حواجز آلية وكاميرات مراقبة للمواقف',
        'دفع إلكتروني وتتبع السيارات',
        'إرشادات ذكية للعثور على مواقف فارغة'
      ],
      features: [
        'توفير الوقت في البحث عن مواقف',
        'أمان عالي مع مراقبة مستمرة',
        'تقارير استخدام وإحصائيات مفصلة'
      ]
    },
    {
      id: 12,
      title: 'نظام سنترال',
      description: 'أنظمة إدارة الطوابير الذكية لتقليل الانتظار وزيادة الكفاءة في الخدمات.',
      icon: 'clock',
      imageNumber: 11,
      types: [
        'أجهزة استدعاء رقمي للطوابير',
        'تطبيقات حجز مواعيد عبر الإنترنت',
        'شاشات عرض رقمي للطوابير',
        'تحليلات لأوقات الانتظار والخدمة'
      ],
      features: [
        'تقليل وقت الانتظار بنسبة 50%',
        'إشعارات فورية عبر الرسائل النصية',
        'تقارير أداء الخدمة وتحسين العمليات'
      ]
    },
    {
      id: 13,
      title: 'نظام المؤتمرات',
      description: 'حلول صوتية وبصرية متقدمة للمؤتمرات والاجتماعات مع جودة عالية.',
      icon: 'microphone',
      imageNumber: 10,
      types: [
        'غرف مؤتمرات مع معدات صوت وبصر متقدمة',
        'أنظمة فيديو كونفرنس عالية الدقة',
        'ترجمة فورية وتسجيل الاجتماعات',
        'تكامل مع منصات الاجتماعات عبر الإنترنت'
      ],
      features: [
        'جودة صوت وبصر استثنائية',
        'تسجيل وأرشفة الاجتماعات',
        'دعم متعدد اللغات والترجمة الفورية'
      ]
    }
  ];

  private iconMap: { [key: string]: any } = {
    'Camera': Camera,
    'Network': Network,
    'Wrench': Wrench,
    'ShieldCheck': ShieldCheck,
    'Flame': Flame,
    'DoorClosed': DoorClosed,
    'Speaker': Speaker,
    'Cable': Cable,
    'Home': Home,
    'Bell': Bell,
    'Lightbulb': Lightbulb,
    'Building2': Building2
  };

  ngOnInit() {
    this.loadServices();
  }

  loadServices() {
    // Simulate loading services without backend
    this.services = this.defaultServices.map(service => ({
      id: service.id,
      title: service.title,
      description: service.description,
      icon: service.icon
    }));
  }

  toggleService(id: number) {
    this.activeServiceId = this.activeServiceId === id ? null : id;
  }

  getIconClass(iconName: string): string {
    const iconClasses: { [key: string]: string } = {
      'Camera': 'video',
      'Network': 'network-wired',
      'Wrench': 'tools',
      'ShieldCheck': 'shield-alt',
      'Flame': 'fire-extinguisher',
      'DoorClosed': 'door-open',
      'Speaker': 'volume-up',
      'Cable': 'plug',
      'Home': 'home',
      'Bell': 'bell',
      'Lightbulb': 'lightbulb',
      'Building2': 'building',
      'fire-extinguisher': 'fire-extinguisher',
      'building': 'building',
      'car': 'car',
      'clock': 'clock',
      'microphone': 'microphone'
    };
    return iconClasses[iconName] || 'cogs';
  }

  getServiceBackground(index: number): string {
    const backgrounds = [
      'linear-gradient(135deg, rgba(102, 126, 234, 0.9) 0%, rgba(118, 75, 162, 0.9) 100%)',
      'linear-gradient(135deg, rgba(255, 107, 107, 0.9) 0%, rgba(255, 142, 83, 0.9) 100%)',
      'linear-gradient(135deg, rgba(29, 151, 108, 0.9) 0%, rgba(147, 51, 234, 0.9) 100%)',
      'linear-gradient(135deg, rgba(46, 60, 145, 0.9) 0%, rgba(0, 182, 255, 0.9) 100%)',
      'linear-gradient(135deg, rgba(242, 175, 32, 0.9) 0%, rgba(214, 61, 94, 0.9) 100%)',
      'linear-gradient(135deg, rgba(79, 140, 255, 0.9) 0%, rgba(125, 245, 212, 0.9) 100%)',
      'linear-gradient(135deg, rgba(255, 87, 34, 0.9) 0%, rgba(156, 39, 176, 0.9) 100%)',
      'linear-gradient(135deg, rgba(0, 150, 136, 0.9) 0%, rgba(76, 175, 80, 0.9) 100%)'
    ];
    return backgrounds[index % backgrounds.length];
  }


}
