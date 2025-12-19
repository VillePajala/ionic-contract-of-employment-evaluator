import { Component, EnvironmentInjector, inject, computed, OnInit } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from '@ionic/angular/standalone';
import { TranslateModule } from '@ngx-translate/core';
import { addIcons } from 'ionicons';
import { calculator, bookmark, informationCircle } from 'ionicons/icons';
import { DatabaseService } from '../core/services/database.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge, TranslateModule],
})
export class TabsPage implements OnInit {
  public environmentInjector = inject(EnvironmentInjector);
  private db = inject(DatabaseService);

  readonly savedCount = computed(() => this.db.calculations().length);

  constructor() {
    addIcons({ calculator, bookmark, informationCircle });
  }

  async ngOnInit(): Promise<void> {
    await this.db.initialize();
  }
}
