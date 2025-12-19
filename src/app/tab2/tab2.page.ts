import { Component, inject, OnInit } from '@angular/core';
import { DecimalPipe, DatePipe } from '@angular/common';
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
  IonButton,
  IonButtons,
  IonIcon,
  IonChip,
  AlertController,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { bookmarkOutline } from 'ionicons/icons';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { DatabaseService } from '../core/services/database.service';
import { LanguageService } from '../core/services/language.service';
import { SavedCalculation } from '../core/models/calculation.interface';

addIcons({ bookmarkOutline });

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    DecimalPipe,
    DatePipe,
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
    IonButton,
    IonButtons,
    IonIcon,
    IonChip,
  ],
})
export class Tab2Page implements OnInit {
  readonly db = inject(DatabaseService);
  readonly language = inject(LanguageService);
  private alertCtrl = inject(AlertController);
  private translate = inject(TranslateService);

  async ngOnInit(): Promise<void> {
    await this.db.initialize();
  }

  /**
   * Shows confirmation dialog and deletes the calculation if confirmed.
   */
  async confirmDelete(calculation: SavedCalculation): Promise<void> {
    const alert = await this.alertCtrl.create({
      header: this.translate.instant('saved.confirmDelete'),
      buttons: [
        { text: this.translate.instant('common.cancel'), role: 'cancel' },
        {
          text: this.translate.instant('saved.delete'),
          role: 'destructive',
          handler: () => {
            if (calculation.id !== undefined) {
              this.db.delete(calculation.id);
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
