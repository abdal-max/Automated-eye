import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link?: string;
  category: string;
  createdAt: string;
  technologies?: string[];
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [];
  loading = false;
  error: string | null = null;
  selectedProject: Project | null = null;
  showModal = false;

  // ✅ المسار الصحيح الآن
  private imageBasePath = 'assets/images/project.image/';
  
  defaultProjects: Project[] = [
    {
      id: 1,
      title: 'جامعة المجمعة',
      description: 'تركيب نظام أمني متكامل يشمل أكثر من 150 كاميرا مراقبة عالية الدقة، أنظمة التحكم بالدخول، وغرف مراقبة مركزية لضمان سلامة الطلاب والكادر التعليمي على مدار الساعة.',
      image: this.getImagePath('project1.jpg'),
      category: '🏛️ تعليمي',
      createdAt: '2023-10-15',
      technologies: ['كاميرات مراقبة', 'أنظمة تحكم الدخول', 'غرف مراقبة مركزية']
    },
    {
      id: 2,
      title: 'مركز التمكين الشامل - الزلفي',
      description: 'حلول أمنية ذكية لمركز رعاية ذوي الاحتياجات الخاصة، تتضمن كاميرات مراقبة داخلية وخارجية، أنظمة إنذار متقدمة، ومراقبة مباشرة عبر التطبيق لضمان بيئة آمنة ومريحة.',
      image: this.getImagePath('project2.jpg'),
      category: '🏥 خدمي',
      createdAt: '2023-09-20',
      technologies: ['كاميرات داخلية/خارجية', 'أنظمة إنذار', 'مراقبة عبر التطبيق']
    },
    {
      id: 3,
      title: 'مركز التمكين الشامل - الأحساء',
      description: 'نظام أمني شامل مصمم خصيصاً لبيئة رعاية صحية واجتماعية، يتضمن تغطية كاملة للمرافق الداخلية والخارجية مع تقنيات التعرف على الحركة والتنبيهات الفورية.',
      image: this.getImagePath('project3.jpg'),
      category: '🏥 خدمي',
      createdAt: '2023-08-10',
      technologies: ['تعرف على الحركة', 'تنبيهات فورية', 'تغطية شاملة']
    },
    {
      id: 4,
      title: 'التعاونية - الزلفي',
      description: 'حماية متكاملة لمركز تسوق كبير تشمل كاميرات مراقبة HD، أنظمة إنذار ضد السرقة، مراقبة نقاط البيع، وتسجيل مستمر لحماية البضائع والعملاء والموظفين.',
      image: this.getImagePath('project4.jpg'),
      category: '🏬 تجاري',
      createdAt: '2023-07-05',
      technologies: ['كاميرات HD', 'أنظمة إنذار', 'مراقبة نقاط البيع']
    },
    {
      id: 5,
      title: 'بلدية الزلفي',
      description: 'مشروع حكومي متكامل يشمل تأمين المباني الإدارية، المرافق العامة، والمواقع الحيوية بنظام مراقبة موحد، غرفة تحكم مركزية، وتقنيات التسجيل المتقدمة.',
      image: this.getImagePath('project5.jpg'),
      category: '🏢 حكومي',
      createdAt: '2023-06-12',
      technologies: ['نظام مراقبة موحد', 'غرفة تحكم مركزية', 'تسجيل متقدم']
    },
    {
      id: 6,
      title: 'مول دومة الجندل',
      description: 'حل أمني عصري لمجمع تجاري كبير يتضمن مراقبة شاملة للمداخل والممرات ومواقف السيارات، نظام إنذار حريق متطور، وربط مباشر مع غرفة العمليات للاستجابة الفورية.',
      image: this.getImagePath('project6.jpg'),
      category: '🏬 تجاري',
      createdAt: '2023-05-18',
      technologies: ['مراقبة شاملة', 'إنذار حريق', 'ربط مباشر']
    }
  ];

  ngOnInit() {
    this.loadProjects();
  }

  /**
   * الحصول على المسار الكامل للصورة
   */
  private getImagePath(imageName: string): string {
    return `${this.imageBasePath}${imageName}`;
  }

  /**
   * تحميل المشاريع
   */
  loadProjects() {
    this.loading = true;
    
    setTimeout(() => {
      try {
        this.projects = this.defaultProjects;
        this.error = null;
      } catch (err) {
        this.error = 'حدث خطأ في تحميل المشاريع';
        console.error('Error loading projects:', err);
      } finally {
        this.loading = false;
      }
    }, 1000);
  }

  /**
   * معالجة أخطاء تحميل الصور
   */
  handleImageError(event: Event, project: Project): void {
    const imgElement = event.target as HTMLImageElement;
    
    // صورة بديلة في حالة الخطأ
    imgElement.src = this.getFallbackImage(project.category);
    imgElement.alt = `صورة بديلة لمشروع ${project.title}`;
    
    console.warn(`فشل تحميل صورة المشروع: ${project.title}`);
  }

  /**
   * الحصول على صورة بديلة بناءً على التصنيف (SVG داخلي)
   */
  private getFallbackImage(category: string): string {
    const fallbackImages: { [key: string]: string } = {
      '🏛️ تعليمي': this.createEducationSVG(),
      '🏥 خدمي': this.createServiceSVG(),
      '🏬 تجاري': this.createCommercialSVG(),
      '🏢 حكومي': this.createGovernmentSVG()
    };

    return fallbackImages[category] || this.createDefaultSVG();
  }

  /**
   * إنشاء SVG للمشاريع التعليمية
   */
  private createEducationSVG(): string {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#4f46e5"/>
      <text x="200" y="120" text-anchor="middle" font-family="Arial" font-size="24" fill="white" font-weight="bold">🎓 مشروع تعليمي</text>
      <text x="200" y="160" text-anchor="middle" font-family="Arial" font-size="16" fill="white" opacity="0.9">جامعة / مدرسة / معهد</text>
      <text x="200" y="190" text-anchor="middle" font-family="Arial" font-size="14" fill="white" opacity="0.7">أنظمة أمنية متكاملة</text>
    </svg>`;
  }

  /**
   * إنشاء SVG للمشاريع الخدمية
   */
  private createServiceSVG(): string {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#10b981"/>
      <text x="200" y="120" text-anchor="middle" font-family="Arial" font-size="24" fill="white" font-weight="bold">🏥 مشروع خدمي</text>
      <text x="200" y="160" text-anchor="middle" font-family="Arial" font-size="16" fill="white" opacity="0.9">مستشفى / مركز رعاية</text>
      <text x="200" y="190" text-anchor="middle" font-family="Arial" font-size="14" fill="white" opacity="0.7">حلول أمنية متخصصة</text>
    </svg>`;
  }

  /**
   * إنشاء SVG للمشاريع التجارية
   */
  private createCommercialSVG(): string {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#f59e0b"/>
      <text x="200" y="120" text-anchor="middle" font-family="Arial" font-size="24" fill="white" font-weight="bold">🏬 مشروع تجاري</text>
      <text x="200" y="160" text-anchor="middle" font-family="Arial" font-size="16" fill="white" opacity="0.9">مركز تسوق / مول</text>
      <text x="200" y="190" text-anchor="middle" font-family="Arial" font-size="14" fill="white" opacity="0.7">نظم مراقبة شاملة</text>
    </svg>`;
  }

  /**
   * إنشاء SVG للمشاريع الحكومية
   */
  private createGovernmentSVG(): string {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#ef4444"/>
      <text x="200" y="120" text-anchor="middle" font-family="Arial" font-size="24" fill="white" font-weight="bold">🏢 مشروع حكومي</text>
      <text x="200" y="160" text-anchor="middle" font-family="Arial" font-size="16" fill="white" opacity="0.9">مؤسسة حكومية</text>
      <text x="200" y="190" text-anchor="middle" font-family="Arial" font-size="14" fill="white" opacity="0.7">أنظمة أمن متطورة</text>
    </svg>`;
  }

  /**
   * إنشاء SVG افتراضي
   */
  private createDefaultSVG(): string {
    return `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#6b7280"/>
      <text x="200" y="120" text-anchor="middle" font-family="Arial" font-size="24" fill="white" font-weight="bold">🔒 مشروع أمني</text>
      <text x="200" y="160" text-anchor="middle" font-family="Arial" font-size="16" fill="white" opacity="0.9">Alaien Security</text>
      <text x="200" y="190" text-anchor="middle" font-family="Arial" font-size="14" fill="white" opacity="0.7">حلول أمنية متكاملة</text>
    </svg>`;
  }

  /**
   * إعادة تحميل المشاريع
   */
  reloadProjects(): void {
    this.loadProjects();
  }

  /**
   * عرض تفاصيل المشروع
   */
  showProjectDetails(project: Project): void {
    this.selectedProject = project;
    this.showModal = true;
  }

  /**
   * إغلاق تفاصيل المشروع
   */
  closeProjectDetails(): void {
    this.selectedProject = null;
    this.showModal = false;
  }

  /**
   * فتح رابط المشروع (إذا موجود)
   */
  openProjectLink(project: Project): void {
    if (project.link) {
      window.open(project.link, '_blank');
    } else {
      this.showProjectDetails(project);
    }
  }
}