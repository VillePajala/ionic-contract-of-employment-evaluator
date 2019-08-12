import { LanguagesService } from './../languages.service';
import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor (private platform : Platform,
               public languagesService : LanguagesService ) {

  }
  

  closeApp = () : void => {
    
    this.platform.backButton.subscribe(() => {
      navigator['app'].exitApp();
    })
  }

}




