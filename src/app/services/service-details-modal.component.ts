import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-service-details-modal',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="modal fade" [id]="'serviceDetailsModal'" tabindex="-1" aria-labelledby="serviceDetailsModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="serviceDetailsModalLabel">تفاصيل الخدمات</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row g-4">
              <div *ngFor="let service of services" class="col-lg-4 col-md-6">
                <div class="service-detail-card p-4 border rounded shadow-sm">
                  <div class="d-flex align-items-center mb-3">
                    <img *ngIf="service.id <= 6" src="assets/images/services/{{ service.id }}.jpg" alt="{{ service.title }}" class="service-detail-image me-3">
                    <i *ngIf="service.id > 6" class="fas fa-{{ getIconClass(service.icon) }} fa-3x text-primary me-3"></i>
                    <h6 class="mb-0 fw-bold">{{ service.title }}</h6>
                  </div>
                  <p class="text-muted mb-3">{{ service.description }}</p>

                  <div class="mb-3">
                    <h6 class="fw-bold text-primary mb-2">الأنواع المتاحة:</h6>
                    <ul class="list-unstyled">
                      <li *ngFor="let type of service.types" class="mb-1">
                        <i class="fas fa-check text-success me-2"></i>{{ type }}
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h6 class="fw-bold text-primary mb-2">أهم المزايا:</h6>
                    <div class="d-flex flex-wrap gap-1">
                      <span *ngFor="let feature of service.features" class="badge bg-primary">{{ feature }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
            <a href="#contact" class="btn btn-primary" data-bs-dismiss="modal">تواصل معنا</a>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .service-detail-card {
      transition: transform 0.2s ease;
    }
    .service-detail-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    }
    .service-detail-image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
  `]
})
export class ServiceDetailsModalComponent {
  @Input() services: any[] = [];

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
      'Building2': 'building'
    };
    return iconClasses[iconName] || 'cogs';
  }
}
