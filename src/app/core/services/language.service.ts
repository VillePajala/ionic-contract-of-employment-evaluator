import { Injectable, signal, effect, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

/**
 * Supported languages in the application.
 */
export type SupportedLanguage = 'fi' | 'en';

/**
 * Service for managing application language with persistence.
 *
 * Uses Angular Signals for reactive state:
 * - `currentLanguage` signal holds the active language
 * - Language preference is persisted to localStorage
 * - Automatically syncs with ngx-translate
 *
 * Example usage:
 * ```typescript
 * languageService.toggle(); // Switch between fi/en
 * const lang = languageService.currentLanguage(); // Get current language
 * ```
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly STORAGE_KEY = 'preferredLanguage';
  private readonly DEFAULT_LANGUAGE: SupportedLanguage = 'fi';

  private translate = inject(TranslateService);

  /**
   * Signal holding the current language.
   * Initialized from localStorage or defaults to Finnish.
   */
  readonly currentLanguage = signal<SupportedLanguage>(this.getStoredLanguage());

  constructor() {
    // Configure ngx-translate
    this.translate.setDefaultLang(this.DEFAULT_LANGUAGE);
    this.translate.addLangs(['fi', 'en']);
    this.translate.use(this.currentLanguage());

    // Effect to persist language changes and sync with translate service
    effect(() => {
      const lang = this.currentLanguage();
      localStorage.setItem(this.STORAGE_KEY, lang);
      this.translate.use(lang);
    });
  }

  /**
   * Toggles between Finnish and English.
   */
  toggle(): void {
    this.currentLanguage.update((current) => (current === 'fi' ? 'en' : 'fi'));
  }

  /**
   * Sets the language to a specific value.
   *
   * @param lang - The language to set
   */
  setLanguage(lang: SupportedLanguage): void {
    this.currentLanguage.set(lang);
  }

  /**
   * Gets the other language (for displaying toggle button text).
   */
  getOtherLanguage(): SupportedLanguage {
    return this.currentLanguage() === 'fi' ? 'en' : 'fi';
  }

  /**
   * Retrieves the stored language preference from localStorage.
   */
  private getStoredLanguage(): SupportedLanguage {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored === 'en' || stored === 'fi') {
      return stored;
    }
    return this.DEFAULT_LANGUAGE;
  }
}
