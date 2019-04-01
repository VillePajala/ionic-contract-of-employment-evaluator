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
  totalSum : number;
  contractTax : number;
  errorMessage : string;
  AdditionalSettings : boolean = false;
  yearlyBonus : number;
  yearlyBonusMonthly : number;
  dataSaved : boolean = false;

  
 

  constructor(public valueCalculator : ValuecalculatorService, private dialogueCtrl : AlertController) {

  }

  checkInput = () : void => {
    if(isNaN(this.contractSalary)){
      this.errorMessage = "Syötä vain numeroita";
      this.valueCalculator.taxPercentEstimate = null;
    } else {}

  }

  getPercentEstimate = () : void => {

    if(isNaN(this.contractSalary)){
      this.errorMessage = "Syötä vain numeroita";
      this.valueCalculator.taxPercentEstimate = null;
    } else {
      if (this.contractSalary) {

        this.yearlyBonusMonthly = Number(this.yearlyBonus) / 12;
        this.totalSum = Number(this.contractSalary) + Number(this.yearlyBonusMonthly);
        this.valueCalculator.getPercentEstimate(this.totalSum);
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
                              "yearlyBonus" : this.yearlyBonus,
                              "contractTax" : this.valueCalculator.taxPercentEstimate,
                              "netSalary" : this.contractSalary * (1 - (this.valueCalculator.taxPercentEstimate / 100))
                            }

    this.contractSalary = null;
    this.contractName = "";
    this.valueCalculator.taxPercentEstimate = null;
    this.dataSaved = true;
    this.yearlyBonus = null;
    this.valueCalculator.contracts.push(newContract);
    this.valueCalculator.contracts.sort((a,b) => (a.netSalary < b.netSalary) ? 1 : -1);
    
  }

  
}
