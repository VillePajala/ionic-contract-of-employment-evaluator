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

constructor(public valueCalculator : ValuecalculatorService) {}

}
