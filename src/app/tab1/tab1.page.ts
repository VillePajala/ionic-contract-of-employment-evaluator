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
  errorMessage : string;
  AdditionalSettings : boolean = false;
  yearlybonus : number;
  dataSaved : boolean = false;
 

  constructor(public valueCalculator : ValuecalculatorService, private dialogueCtrl : AlertController) {

  }
  getPercentEstimate = () : void => {

    if(isNaN(this.contractSalary)){
      this.errorMessage = "Syötä vain numeroita";
      this.valueCalculator.taxPercentEstimate = null;
    } else {
      if (this.contractSalary) {

        let x = Number(this.yearlybonus) / 12;
        this.contractSalary = Number(this.contractSalary) + Number(x);

        this.valueCalculator.getPercentEstimate(this.contractSalary);
        this.dataSaved = false;
        this.errorMessage = null;
      } else {
        this.errorMessage = "Kenttää ei voi jättää tyhjäksi"
        this.valueCalculator.taxPercentEstimate = null;
      }
    }
  }

  showAdditionalSettings = () : void => {
    this.AdditionalSettings = true;
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
                              "yearlyBonus" : this.yearlybonus,
                              "contractTax" : this.valueCalculator.taxPercentEstimate,
                              "netSalary" : this.contractSalary * (1 - (this.valueCalculator.taxPercentEstimate / 100))
                            }

    this.contractSalary = null;
    this.contractName = "";
    this.valueCalculator.taxPercentEstimate = null;
    this.dataSaved = true;
    this.yearlybonus = null;
    this.valueCalculator.contracts.push(newContract);
    this.valueCalculator.contracts.sort((a,b) => (a.netSalary < b.netSalary) ? 1 : -1);
    
  }

  
}
