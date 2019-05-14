import { DatabaseService } from './../database.service';
import { AlertController, Platform } from '@ionic/angular';
import { ValuecalculatorService } from './../valuecalculator.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

contractPension1 : number = 0.0675;
contractPension2 : number = 0.0825;
contractUnemploymentInsurance : number = 0.015 

constructor(public valueCalculator : ValuecalculatorService,
            private dialogueCtrl : AlertController,
            public database : DatabaseService,
            private platform : Platform) {

  }

  confirmDelete = async (id) : Promise<any> => {
    let identification = id;
    const alertWindow = await this.dialogueCtrl.create({
                                                    header: "Haluatko varmasti poistaa tiedon?",
                                                    inputs : [  
                                                              ],
                                                    buttons : [
                                                                {
                                                                  text : "Poista",
                                                                  handler : (data : any) => {
                                                                            this.database.deleteContract(identification);
                                                                          }
                                                                },
                                                                {
                                                                  text : "Peruuta",
                                                                  role : "cancel",
                                                                  cssClass : "secondary"
                                                                }
                                                              ]
                                                      });
    await alertWindow.present();
  }

  

}


