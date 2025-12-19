import { Component, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonButtons,
  IonText,
  IonSelect,
  IonSelectOption,
  IonToggle,
  IonList,
  IonSegment,
  IonSegmentButton,
  AlertController,
} from '@ionic/angular/standalone';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TaxCalculatorService } from '../core/services/tax-calculator.service';
import { DatabaseService } from '../core/services/database.service';
import { LanguageService } from '../core/services/language.service';
import { PwaInstallService } from '../core/services/pwa-install.service';
import {
  MUNICIPALITIES_2025,
  DEFAULT_MUNICIPAL_TAX_RATE,
  AgeRange,
} from '../core/data/tax-config';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    FormsModule,
    DecimalPipe,
    TranslateModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonButtons,
    IonText,
    IonSelect,
    IonSelectOption,
    IonToggle,
    IonList,
    IonSegment,
    IonSegmentButton,
  ],
})
export class Tab1Page {
  private taxCalculator = inject(TaxCalculatorService);
  private db = inject(DatabaseService);
  private alertCtrl = inject(AlertController);
  private translate = inject(TranslateService);

  readonly language = inject(LanguageService);
  readonly pwaInstall = inject(PwaInstallService);

  // Municipality list for dropdown
  readonly municipalities = MUNICIPALITIES_2025;
  readonly defaultMunicipalRate = DEFAULT_MUNICIPAL_TAX_RATE;

  // Form inputs as signals
  grossSalary = signal<string>('');
  yearlyBonus = signal<string>('');
  showBonusInput = signal(false);

  // User options signals
  selectedAgeRange = signal<AgeRange>('17-52');
  selectedMunicipality = signal<string>('Helsinki');
  customMunicipalRate = signal<string>('');
  useCustomRate = signal(false);
  isChurchMember = signal(false);

  // Computed municipal rate based on selection
  readonly effectiveMunicipalRate = computed(() => {
    if (this.useCustomRate()) {
      const rate = this.parseNumber(this.customMunicipalRate());
      return rate !== null ? rate : this.defaultMunicipalRate;
    }
    const municipality = this.municipalities.find(
      (m) => m.name === this.selectedMunicipality()
    );
    return municipality?.rate ?? this.defaultMunicipalRate;
  });

  // UI state
  errorMessage = signal<string | null>(null);
  showSavedMessage = signal(false);
  showBreakdown = signal(false);

  // Computed result from tax calculator service
  readonly result = computed(() => this.taxCalculator.result());
  readonly userOptions = computed(() => this.taxCalculator.userOptions());

  /**
   * Updates user options in the calculator service.
   */
  updateUserOptions(): void {
    this.taxCalculator.updateUserOptions({
      ageRange: this.selectedAgeRange(),
      municipalityRate: this.effectiveMunicipalRate(),
      churchMember: this.isChurchMember(),
    });
  }

  /**
   * Called when age range changes.
   */
  onAgeRangeChange(event: CustomEvent): void {
    this.selectedAgeRange.set(event.detail.value as AgeRange);
    this.updateUserOptions();
  }

  /**
   * Called when municipality selection changes.
   */
  onMunicipalityChange(event: CustomEvent): void {
    const value = event.detail.value;
    if (value === 'custom') {
      this.useCustomRate.set(true);
    } else {
      this.useCustomRate.set(false);
      this.selectedMunicipality.set(value);
    }
    this.updateUserOptions();
  }

  /**
   * Called when custom municipal rate changes.
   */
  onCustomRateChange(): void {
    this.updateUserOptions();
  }

  /**
   * Called when church membership toggle changes.
   */
  onChurchMemberChange(event: CustomEvent): void {
    this.isChurchMember.set(event.detail.checked);
    this.updateUserOptions();
  }

  /**
   * Calculates net salary from the input values.
   */
  calculate(): void {
    const salary = this.parseNumber(this.grossSalary());
    const bonus = this.parseNumber(this.yearlyBonus()) ?? 0;

    // Validate input
    if (salary === null || salary <= 0) {
      this.errorMessage.set(this.translate.instant('validation.invalidNumber'));
      return;
    }

    if (salary > 1_000_000_000) {
      this.errorMessage.set(this.translate.instant('validation.tooLarge'));
      return;
    }

    this.errorMessage.set(null);
    this.updateUserOptions();
    this.taxCalculator.updateSalary(salary, bonus);
  }

  /**
   * Shows the save dialog and saves the calculation.
   */
  async save(): Promise<void> {
    const result = this.result();
    if (!result) return;

    const alert = await this.alertCtrl.create({
      header: this.translate.instant('calculator.saveName'),
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: this.translate.instant('calculator.namePlaceholder'),
        },
      ],
      buttons: [
        { text: this.translate.instant('common.cancel'), role: 'cancel' },
        {
          text: this.translate.instant('calculator.save'),
          handler: async (data) => {
            await this.db.save({
              ...result,
              name: data.name || 'Unnamed',
              createdAt: new Date(),
              userOptions: this.taxCalculator.getCurrentUserOptions(),
            });
            this.showSavedConfirmation();
            this.resetForm();
          },
        },
      ],
    });
    await alert.present();
  }

  /**
   * Toggles visibility of the bonus input field.
   */
  toggleBonus(): void {
    this.showBonusInput.update((v) => !v);
  }

  /**
   * Toggles visibility of the breakdown section.
   */
  toggleBreakdown(): void {
    this.showBreakdown.update((v) => !v);
  }

  /**
   * Parses a string to number, handling Finnish decimal separator (comma).
   */
  private parseNumber(value: string): number | null {
    if (!value) return null;
    // Handle Finnish decimal separator (comma) and remove spaces
    const normalized = value.replace(/\s/g, '').replace(',', '.');
    const num = parseFloat(normalized);
    return isNaN(num) ? null : num;
  }

  /**
   * Resets the form to initial state.
   */
  private resetForm(): void {
    this.grossSalary.set('');
    this.yearlyBonus.set('');
    this.taxCalculator.reset();
  }

  /**
   * Shows the "Data saved!" confirmation message.
   */
  private showSavedConfirmation(): void {
    this.showSavedMessage.set(true);
    setTimeout(() => this.showSavedMessage.set(false), 2000);
  }
}
