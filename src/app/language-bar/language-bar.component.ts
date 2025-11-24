/**
 * Language Bar Component
 * Professional language selection component with logo integration
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Language {
  code: string;
  name: string;
  flag: string;
}

@Component({
  selector: 'app-language-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-bar.component.html',
  styleUrls: ['./language-bar.component.css']
})
export class LanguageBarComponent {
  currentLanguage: string = 'ar';

  languages: Language[] = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
  ];

  /**
   * Sets the current language and handles language switching logic
   * @param langCode The language code to switch to
   */
  setLanguage(langCode: string): void {
    if (this.currentLanguage !== langCode) {
      this.currentLanguage = langCode;
      // TODO: Implement full language switching logic with i18n service
      console.log('Language switched to:', langCode);
      // Future: Update document direction, load translations, etc.
    }
  }

  /**
   * TrackBy function for ngFor optimization
   * @param index The index of the item
   * @param item The language item
   * @returns The unique identifier for the item
   */
  trackByFn(index: number, item: Language): string {
    return item.code;
  }
}
