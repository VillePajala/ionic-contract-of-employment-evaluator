import { AlertController } from '@ionic/angular';
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
            private dialogueCtrl : AlertController) {

  }

  confirmDelete = async (id) : Promise<any> => {
    let identification = id;
    const alertWindow = await this.dialogueCtrl.create({
                                                    header: "Varoitus!",
                                                    message : "Haluatko varmasti poistaa?",
                                                    inputs : [  
                                                              ],
                                                    buttons : [
                                                                {
                                                                  text : "Poista",
                                                                  handler : (data : any) => {
                                                                            this.deleteImage(identification);
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

  deleteImage = (id) : void => {
    let i = 0;
    this.valueCalculator.contracts.forEach((contract) => {
      if (contract.timestamp == id) {
        this.valueCalculator.contracts.splice(i);
      }
      i = i + 1;
    })
  }

}
