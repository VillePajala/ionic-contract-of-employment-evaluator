import { LanguagesService } from './../languages.service';
import { DatabaseService } from './../database.service';
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
  yearlyBonus : number = 0;
  yearlyBonusMonthly : number = 0;
  dataSaved : boolean = false;
  


  constructor(public valueCalculator : ValuecalculatorService, 
              private dialogueCtrl : AlertController,
              public database : DatabaseService,
              public languageSelector : LanguagesService) {

  }

  checkInput = () : void => {
    if(isNaN(this.contractSalary)){
      this.errorMessage = "Syötä vain numeroita";
      this.valueCalculator.taxPercentEstimate = null;
    } else {}
  }


  getPercentEstimate = () : void => {

    if(isNaN(this.contractSalary)){
      this.errorMessage = "Tarkista summa"
      this.valueCalculator.taxPercentEstimate = null;
    } else {
      if (this.contractSalary) {
        this.yearlyBonusMonthly = Number(this.yearlyBonus) / 12;
        this.totalSum = Number(this.contractSalary) + Number(this.yearlyBonusMonthly);
        this.valueCalculator.getPercentEstimate(this.totalSum);
        this.dataSaved = false;
        this.errorMessage = null;
      } else {
        this.errorMessage = "Tarkista summa"
        this.valueCalculator.taxPercentEstimate = null;
      }
    }
  }


  showAdditionalSettings = () : void => {
    if (this.AdditionalSettings == false) {
      this.AdditionalSettings = true;
    } else {
      this.AdditionalSettings = false;
    }
  }

  saveDataAs = async () : Promise<any> => {
    const alertWindow = await this.dialogueCtrl.create({
                                                    header: "Millä nimellä summa tallennetaan?",
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

  saveDataAsInEnglish = async () : Promise<any> => {
    const alertWindow = await this.dialogueCtrl.create({
                                                    header: "How would you like to name the calculation?",
                                                    inputs : [  
                                                                {
                                                                  name : "contractName",
                                                                  type : "text",
                                                                  placeholder : "i.e. Company name"
                                                                }
                                                              ],
                                                    buttons : [
                                                                {
                                                                  text : "Save",
                                                                  handler : (data : any) => {
                                                                            this.contractName = data.contractName;
                                                                            this.saveContractData();
                                                                          }
                                                                },
                                                                {
                                                                  text : "Cancel",
                                                                  role : "cancel",
                                                                  cssClass : "secondary"
                                                                }
                                                              ]
                                                      });
    await alertWindow.present();
  }


  saveContractData = () : void => {
    let timestamp = new Date().getTime();
    let newContract : any = {
                              "contractName" : this.contractName,
                              "contractSalary" : this.contractSalary,
                              "yearlyBonus" : this.yearlyBonus,
                              "contractTax" : this.valueCalculator.taxPercentEstimate,
                              "taxPaid" :  this.totalSum * (this.valueCalculator.taxPercentEstimate / 100),
                              "netSalary" : this.totalSum * (1 - (this.valueCalculator.taxPercentEstimate / 100)),
                              "timestamp" : timestamp
                            }

    this.contractSalary = null;
    this.contractName = "";
    this.valueCalculator.taxPercentEstimate = null;
    this.dataSaved = true;
    this.yearlyBonus = null;
    this.database.newContract(newContract);
    //this.valueCalculator.contracts.push(newContract);
    //this.valueCalculator.contracts.sort((a,b) => (a.netSalary < b.netSalary) ? 1 : -1);
    this.fadeOutSaveMessage();
    
  }

  fadeOutSaveMessage = () : void => {
    setTimeout(() => {
      this.dataSaved = false;
    }, 2000);
  }
    
}


