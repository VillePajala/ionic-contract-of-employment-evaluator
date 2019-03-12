import { ValuecalculatorService } from './../valuecalculator.service';
import { Component } from '@angular/core';

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

  constructor(public valueCalculator : ValuecalculatorService) {

  }
  getPercentEstimate = () : void => {
    this.valueCalculator.getPercentEstimate(this.contractSalary);
    this.dataSaved = false;
    this.result = true;
  }

  saveContractData = () : void => {
    let newContract : any = {
                              "contractName" : this.contractName,
                              "contractSalary" : this.contractSalary,
                              "contractTax" : this.valueCalculator.taxPercentEstimate
                            }

    this.contractSalary = null;
    this.contractName = "";
    this.valueCalculator.taxPercentEstimate = null;
    this.valueCalculator.contracts.push(newContract);
    this.dataSaved = true;
    this.result = false;
  }

  

}
