import { ValuecalculatorService } from './../valuecalculator.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  contractName : string;
  contractSalary : number;
  contractTax : number;

  dataSaved : boolean = false;
  result : boolean = false;

  constructor(public valueCalculator : ValuecalculatorService, private dialogueCtrl : AlertController) {

  }
  getPercentEstimate = () : void => {
    this.valueCalculator.getPercentEstimate(this.contractSalary);
    this.dataSaved = false;
    this.result = true;
  }

  saveDataAs = async () : Promise<any> => {
    const alertWindow = await this.dialogueCtrl.create({
                                                    header: "Tallenna nimellä",
                                                    message : "Millä nimellä tieto tallennetaan?",
                                                    inputs : [  
                                                                {
                                                                  name : "contractName",
                                                                  type : "text",
                                                                  placeholder : "esim. yrityksen nimi"
                                                                }
                                                              ],
                                                    buttons : [
                                                                {
                                                                  text : "Tallenna",
                                                                  handler : (data : any) => {
                                                                            this.contractName = data.contractName;
                                                                            this.saveContractData();
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


  saveContractData = () : void => {
    let newContract : any = {
                              "contractName" : this.contractName,
                              "contractSalary" : this.contractSalary,
                              "contractTax" : this.valueCalculator.taxPercentEstimate,
                              "netSalary" : this.contractSalary * (1 - (this.valueCalculator.taxPercentEstimate / 100))
                            }

    this.contractSalary = null;
    this.contractName = "";
    this.valueCalculator.taxPercentEstimate = null;
    this.valueCalculator.contracts.push(newContract);
    this.valueCalculator.contracts.sort((a,b) => (a.netSalary < b.netSalary) ? 1 : -1);
    this.dataSaved = true;
    this.result = false;
  }

  
}
