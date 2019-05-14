import { Platform } from '@ionic/angular';
import { Component } from '@angular/core';


@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor (private platform : Platform) {

  }

  closeApp = () : void => {
    navigator['app'].exitApp();
    //this.platform.exitApp();
  }

}




