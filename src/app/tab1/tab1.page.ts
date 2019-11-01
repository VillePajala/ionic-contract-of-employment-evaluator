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
  commaToDot : string = "";
  


  constructor(public valueCalculator : ValuecalculatorService, 
              private dialogueCtrl : AlertController,
              public database : DatabaseService,
              public languageSelector : LanguagesService) {

  }

  checkInput = () : void => {
    this.commaToDot = this.contractSalary.toString();
    this.commaToDot = this.commaToDot.replace(/\./g, '').replace(',', '.');
    this.contractSalary = Number(this.commaToDot)

    if(isNaN(this.contractSalary)){
      if (this.languageSelector.language == 'fi') {
        this.errorMessage = "Tarkista summa. Käytä vain numeroita.";
      } else {
        this.errorMessage = "Check value. Use only numbers";
      }
      
      this.valueCalculator.taxPercentEstimate = null;
    } else {}
  }


  getPercentEstimate = () : void => {
    this.commaToDot = this.contractSalary.toString();
    this.commaToDot = this.commaToDot.replace(/\./g, '').replace(',', '.');
    this.contractSalary = Number(this.commaToDot)
    
    if(isNaN(this.contractSalary) || this.contractSalary > 1000000000){
      if (this.languageSelector.language == 'fi') {
        this.errorMessage = "Tarkista summa. Syötteen täytyy olla numero, joka on alle yhden miljardin";
      } else {
        this.errorMessage = "Check value. Input must be a number and less than 1 billion";
      }
      this.valueCalculator.taxPercentEstimate = null;
    } else {
      if (this.contractSalary) {
        this.yearlyBonusMonthly = Number(this.yearlyBonus) / 12;
        this.totalSum = Number(this.contractSalary) + Number(this.yearlyBonusMonthly);
        this.valueCalculator.getPercentEstimate(this.totalSum);
        this.dataSaved = false;
        this.errorMessage = null;
      } else {
        if (this.languageSelector.language == 'fi') {
          this.errorMessage = "Tarkista summa. Käytä vain numeroita.";
        } else {
          this.errorMessage = "Check value. Use only numbers";
        }
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
    this.fadeOutSaveMessage();
    
  }

  fadeOutSaveMessage = () : void => {
    setTimeout(() => {
      this.dataSaved = false;
    }, 2000);
  }
    
}


