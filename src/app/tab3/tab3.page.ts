import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonButtons,
  IonChip,
  IonIcon,
  IonLabel,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { calendarOutline } from 'ionicons/icons';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../core/services/language.service';

addIcons({ calendarOutline });

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    TranslateModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonButtons,
    IonChip,
    IonIcon,
    IonLabel,
  ],
})
export class Tab3Page {
  readonly language = inject(LanguageService);

  /** Application version from package.json */
  readonly appVersion = '2.0.0';
}
