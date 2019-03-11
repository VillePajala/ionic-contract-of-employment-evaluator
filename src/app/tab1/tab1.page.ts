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
  contractAge : number;

  contractPension1 : number = 0.0675;
  contractPension2 : number = 0.0825;
  contractUnemploymentInsurance : number = 0.015 

  constructor(private valueCalculator : ValuecalculatorService) {

  }

  saveContractData = () : void => {
    let newContract : any = {
                              "contractName" : this.contractName,
                              "contractSalary" : this.contractSalary,
                              "contractTax" : this.contractTax,
                              "contractAge" : this.contractAge
                            }
    this.valueCalculator.contracts.push(newContract);
  }

}
