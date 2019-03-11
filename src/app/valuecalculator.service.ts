import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValuecalculatorService {

  contracts : any[] = []
  taxPercentEstimate : number;
  constructor() { }

  getPercentEstimate = (id) : void => {
    let yearSalary = 12.5 * id;

    if (yearSalary >= 1 && yearSalary <= 14000) {
      this.taxPercentEstimate = 8.3;
    }
    if (yearSalary > 14000 && yearSalary <= 15000) {
      this.taxPercentEstimate = 9.8;
    }
    if (yearSalary > 15000 && yearSalary <= 16000) {
      this.taxPercentEstimate = 10.6;
    }
    if (yearSalary > 16000 && yearSalary <= 17000) {
      this.taxPercentEstimate = 12.1;
    }
    if (yearSalary > 17000 && yearSalary <= 18000) {
      this.taxPercentEstimate = 13.4;
    }
    if (yearSalary > 18000 && yearSalary <= 19000) {
      this.taxPercentEstimate = 14.6;
    }
    if (yearSalary > 19000 && yearSalary <= 20000) {
      this.taxPercentEstimate = 15.7;
    }
    if (yearSalary > 20000 && yearSalary <= 21000) {
      this.taxPercentEstimate = 16.8;
    }
    if (yearSalary > 21000 && yearSalary <= 22000) {
      this.taxPercentEstimate = 17.9;
    }
    if (yearSalary > 22000 && yearSalary <= 23000) {
      this.taxPercentEstimate = 18.8;
    }
    if (yearSalary > 23000 && yearSalary <= 24000) {
      this.taxPercentEstimate = 19.6;
    }
    if (yearSalary > 24000 && yearSalary <= 25000) {
      this.taxPercentEstimate = 20.4;
    }
    if (yearSalary > 25000 && yearSalary <= 26000) {
      this.taxPercentEstimate = 21.1;
    }
    if (yearSalary > 26000 && yearSalary <= 27000) {
      this.taxPercentEstimate = 21.8;
    }
    if (yearSalary > 27000 && yearSalary <= 28000) {
      this.taxPercentEstimate = 22.4;
    }
    if (yearSalary > 28000 && yearSalary <= 29000) {
      this.taxPercentEstimate = 22.9;
    }
    if (yearSalary > 29000 && yearSalary <= 30000) {
      this.taxPercentEstimate = 23.3;
    }
    if (yearSalary > 30000 && yearSalary <= 31000) {
      this.taxPercentEstimate = 24;
    }
    if (yearSalary > 31000 && yearSalary <= 32000) {
      this.taxPercentEstimate = 24.6;
    }
    if (yearSalary > 32000 && yearSalary <= 33000) {
      this.taxPercentEstimate = 25.3;
    }
    if (yearSalary > 33000 && yearSalary <= 34000) {
      this.taxPercentEstimate = 25.9;
    }
    if (yearSalary > 34000 && yearSalary <= 35000) {
      this.taxPercentEstimate = 26.5;
    }
    if (yearSalary > 35000 && yearSalary <= 36000) {
      this.taxPercentEstimate = 27.1;
    }
    if (yearSalary > 36000 && yearSalary <= 37000) {
      this.taxPercentEstimate = 27.6;
    }
    if (yearSalary > 37000 && yearSalary <= 38000) {
      this.taxPercentEstimate = 28.1;
    }
    if (yearSalary > 38000 && yearSalary <= 39000) {
      this.taxPercentEstimate = 28.6;
    }
    if (yearSalary > 39000 && yearSalary <= 40000) {
      this.taxPercentEstimate = 29.1;
    }
    if (yearSalary > 40000 && yearSalary <= 41000) {
      this.taxPercentEstimate = 29.5;
    }
    if (yearSalary > 41000 && yearSalary <= 42000) {
      this.taxPercentEstimate = 29.9;
    }
    if (yearSalary > 42000 && yearSalary <= 43000) {
      this.taxPercentEstimate = 30.3;
    }
    if (yearSalary > 43000 && yearSalary <= 44000) {
      this.taxPercentEstimate = 30.7;
    }
    if (yearSalary > 44000 && yearSalary <= 45000) {
      this.taxPercentEstimate = 31.1;
    }
    if (yearSalary > 45000 && yearSalary <= 46000) {
      this.taxPercentEstimate = 31.4;
    }
    if (yearSalary > 46000 && yearSalary <= 47000) {
      this.taxPercentEstimate = 31.8;
    }
    if (yearSalary > 47000 && yearSalary <= 48000) {
      this.taxPercentEstimate = 32.1;
    }
    if (yearSalary > 48000 && yearSalary <= 49000) {
      this.taxPercentEstimate = 32.4;
    }
    if (yearSalary > 49000 && yearSalary <= 50000) {
      this.taxPercentEstimate = 32.8;
    }
    if (yearSalary > 50000 && yearSalary <= 51000) {
      this.taxPercentEstimate = 33.1;
    }
    if (yearSalary > 51000 && yearSalary <= 52000) {
      this.taxPercentEstimate = 33.5;
    }
    if (yearSalary > 52000 && yearSalary <= 53000) {
      this.taxPercentEstimate = 33.8;
    }
    if (yearSalary > 53000 && yearSalary <= 54000) {
      this.taxPercentEstimate = 34.1;
    }
    if (yearSalary > 54000 && yearSalary <= 55000) {
      this.taxPercentEstimate = 34.4;
    }
    if (yearSalary > 55000 && yearSalary <= 56000) {
      this.taxPercentEstimate = 34.7;
    }
    if (yearSalary > 56000 && yearSalary <= 57000) {
      this.taxPercentEstimate = 35;
    }
    if (yearSalary > 57000 && yearSalary <= 58000) {
      this.taxPercentEstimate = 35.3;
    }
    if (yearSalary > 58000 && yearSalary <= 59000) {
      this.taxPercentEstimate = 35.5;
    }
    if (yearSalary > 59000 && yearSalary <= 60000) {
      this.taxPercentEstimate = 35.8;
    }
    if (yearSalary > 60000 && yearSalary <= 61000) {
      this.taxPercentEstimate = 36;
    }
    if (yearSalary > 61000 && yearSalary <= 62000) {
      this.taxPercentEstimate = 36.3;
    }
    if (yearSalary > 62000 && yearSalary <= 63000) {
      this.taxPercentEstimate = 36.5;
    }
    if (yearSalary > 63000 && yearSalary <= 64000) {
      this.taxPercentEstimate = 36.7;
    }
    if (yearSalary > 64000 && yearSalary <= 65000) {
      this.taxPercentEstimate = 36.9;
    }
    if (yearSalary > 65000 && yearSalary <= 66000) {
      this.taxPercentEstimate = 37.2;
    }
    if (yearSalary > 66000 && yearSalary <= 67000) {
      this.taxPercentEstimate = 37.4;
    }
    if (yearSalary > 67000 && yearSalary <= 68000) {
      this.taxPercentEstimate = 37.6;
    }
    if (yearSalary > 68000 && yearSalary <= 69000) {
      this.taxPercentEstimate = 37.7;
    }
    if (yearSalary > 69000 && yearSalary <= 70000) {
      this.taxPercentEstimate = 37.9;
    }
    if (yearSalary > 70000 && yearSalary <= 71000) {
      this.taxPercentEstimate = 38.1;
    }
    if (yearSalary > 71000 && yearSalary <= 72000) {
      this.taxPercentEstimate = 38.3;
    }
    if (yearSalary > 72000 && yearSalary <= 73000) {
      this.taxPercentEstimate = 38.5;
    }
    if (yearSalary > 73000 && yearSalary <= 74000) {
      this.taxPercentEstimate = 38.6;
    }
    if (yearSalary > 74000 && yearSalary <= 75000) {
      this.taxPercentEstimate = 38.8;
    }
    if (yearSalary > 75000 && yearSalary <= 76000) {
      this.taxPercentEstimate = 38.9;
    }
    if (yearSalary > 76000 && yearSalary <= 77000) {
      this.taxPercentEstimate = 39.1;
    }
    if (yearSalary > 77000 && yearSalary <= 78000) {
      this.taxPercentEstimate = 39.3;
    }
    if (yearSalary > 78000 && yearSalary <= 79000) {
      this.taxPercentEstimate = 39.4;
    }
    if (yearSalary > 79000 && yearSalary <= 80000) {
      this.taxPercentEstimate = 39.5;
    }
    if (yearSalary > 80000 && yearSalary <= 81000) {
      this.taxPercentEstimate = 39.7;
    }
    if (yearSalary > 81000 && yearSalary <= 82000) {
      this.taxPercentEstimate = 39.8;
    }
    if (yearSalary > 82000 && yearSalary <= 83000) {
      this.taxPercentEstimate = 40;
    }
    if (yearSalary > 83000 && yearSalary <= 84000) {
      this.taxPercentEstimate = 40.1;
    }
    if (yearSalary > 84000 && yearSalary <= 85000) {
      this.taxPercentEstimate = 40.2;
    }
    if (yearSalary > 85000 && yearSalary <= 86000) {
      this.taxPercentEstimate = 40.4;
    }
    if (yearSalary > 86000 && yearSalary <= 87000) {
      this.taxPercentEstimate = 40.6;
    }
    if (yearSalary > 87000 && yearSalary <= 88000) {
      this.taxPercentEstimate = 40.9;
    }
    if (yearSalary > 88000 && yearSalary <= 89000) {
      this.taxPercentEstimate = 41.1;
    }
    if (yearSalary > 89000 && yearSalary <= 90000) {
      this.taxPercentEstimate = 41.3;
    }
    if (yearSalary > 90000 && yearSalary <= 91000) {
      this.taxPercentEstimate = 41.5;
    }
    if (yearSalary > 91000 && yearSalary <= 92000) {
      this.taxPercentEstimate = 41.7;
    }
    if (yearSalary > 92000 && yearSalary <= 93000) {
      this.taxPercentEstimate = 41.9;
    }
    if (yearSalary > 93000 && yearSalary <= 94000) {
      this.taxPercentEstimate = 42.1;
    }
    if (yearSalary > 94000 && yearSalary <= 95000) {
      this.taxPercentEstimate = 42.2;
    }
    if (yearSalary > 95000 && yearSalary <= 96000) {
      this.taxPercentEstimate = 42.4;
    }
    if (yearSalary > 96000 && yearSalary <= 97000) {
      this.taxPercentEstimate = 42.6;
    }
    if (yearSalary > 97000 && yearSalary <= 98000) {
      this.taxPercentEstimate = 42.8;
    }
    if (yearSalary > 98000 && yearSalary <= 99000) {
      this.taxPercentEstimate = 42.9;
    }
    if (yearSalary > 99000 && yearSalary <= 100000) {
      this.taxPercentEstimate = 43.1;
    }
    if (yearSalary > 100000 && yearSalary <= 101000) {
      this.taxPercentEstimate = 43.2;
    }
    if (yearSalary > 101000 && yearSalary <= 102000) {
      this.taxPercentEstimate = 43.4;
    }
    if (yearSalary > 102000 && yearSalary <= 103000) {
      this.taxPercentEstimate = 43.5;
    }
    if (yearSalary > 103000 && yearSalary <= 104000) {
      this.taxPercentEstimate = 43.7;
    }
    if (yearSalary > 104000 && yearSalary <= 105000) {
      this.taxPercentEstimate = 43.8;
    }
    if (yearSalary > 105000 && yearSalary <= 106000) {
      this.taxPercentEstimate = 44;
    }
    if (yearSalary > 106000 && yearSalary <= 107000) {
      this.taxPercentEstimate = 44.1;
    }
    if (yearSalary > 107000 && yearSalary <= 108000) {
      this.taxPercentEstimate = 44.2;
    }
    if (yearSalary > 108000 && yearSalary <= 109000) {
      this.taxPercentEstimate = 44.4;
    }
    if (yearSalary > 109000 && yearSalary <= 110000) {
      this.taxPercentEstimate = 44.5;
    }
    if (yearSalary > 110000 && yearSalary <= 111000) {
      this.taxPercentEstimate = 44.6;
    }
    if (yearSalary > 111000 && yearSalary <= 112000) {
      this.taxPercentEstimate = 44.8;
    }
    if (yearSalary > 112000 && yearSalary <= 113000) {
      this.taxPercentEstimate = 44.9;
    }
    if (yearSalary > 113000 && yearSalary <= 114000) {
      this.taxPercentEstimate = 45;
    }
    if (yearSalary > 114000 && yearSalary <= 115000) {
      this.taxPercentEstimate = 45.1;
    }
    if (yearSalary > 115000 && yearSalary <= 116000) {
      this.taxPercentEstimate = 45.3;
    }
    if (yearSalary > 116000 && yearSalary <= 117000) {
      this.taxPercentEstimate = 45.4;
    }
    if (yearSalary > 117000 && yearSalary <= 118000) {
      this.taxPercentEstimate = 45.5;
    }
    if (yearSalary > 118000 && yearSalary <= 119000) {
      this.taxPercentEstimate = 45.6;
    }
    if (yearSalary > 119000 && yearSalary <= 120000) {
      this.taxPercentEstimate = 45.7;
    }
    if (yearSalary > 120000 && yearSalary <= 121000) {
      this.taxPercentEstimate = 45.8;
    }
    if (yearSalary > 121000 && yearSalary <= 122000) {
      this.taxPercentEstimate = 45.9;
    }
    if (yearSalary > 122000 && yearSalary <= 123000) {
      this.taxPercentEstimate = 46;
    }
    if (yearSalary > 123000 && yearSalary <= 124000) {
      this.taxPercentEstimate = 46.1;
    }
    if (yearSalary > 124000 && yearSalary <= 125000) {
      this.taxPercentEstimate = 46.2;
    }
    if (yearSalary > 125000 && yearSalary <= 126000) {
      this.taxPercentEstimate = 46.3;
    }
    if (yearSalary > 126000 && yearSalary <= 127000) {
      this.taxPercentEstimate = 46.4;
    }
    if (yearSalary > 127000 && yearSalary <= 128000) {
      this.taxPercentEstimate = 46.5;
    }
    if (yearSalary > 128000 && yearSalary <= 129000) {
      this.taxPercentEstimate = 46.6;
    }
    if (yearSalary > 129000 && yearSalary <= 130000) {
      this.taxPercentEstimate = 46.7;
    }
    if (yearSalary > 130000 && yearSalary <= 135000) {
      this.taxPercentEstimate = 47.1;
    }
    if (yearSalary > 135000 && yearSalary <= 140000) {
      this.taxPercentEstimate = 47.5;
    }
    if (yearSalary > 140000 && yearSalary <= 145000) {
      this.taxPercentEstimate = 47.8;
    }
    if (yearSalary > 145000 && yearSalary <= 150000) {
      this.taxPercentEstimate = 48.1;
    }
    if (yearSalary > 150000 && yearSalary <= 155000) {
      this.taxPercentEstimate = 48.4;
    }
    if (yearSalary > 155000 && yearSalary <= 160000) {
      this.taxPercentEstimate = 48.7;
    }
    if (yearSalary > 160000 && yearSalary <= 165000) {
      this.taxPercentEstimate = 48.9;
    }
    if (yearSalary > 165000 && yearSalary <= 170000) {
      this.taxPercentEstimate = 49.2;
    }
    if (yearSalary > 170000 && yearSalary <= 175000) {
      this.taxPercentEstimate = 49.4;
    }
    if (yearSalary > 175000 && yearSalary <= 180000) {
      this.taxPercentEstimate = 49.6;
    }
    if (yearSalary > 180000 && yearSalary <= 185000) {
      this.taxPercentEstimate = 49.8;
    }
    if (yearSalary > 185000 && yearSalary <= 190000) {
      this.taxPercentEstimate = 49.8;
    }
    if (yearSalary > 190000 && yearSalary <= 195000) {
      this.taxPercentEstimate = 50.2;
    }
    if (yearSalary > 195000 && yearSalary <= 200000) {
      this.taxPercentEstimate = 50.4;
    }
    if (yearSalary > 200000 && yearSalary <= 250000) {
      this.taxPercentEstimate = 51.7;
    }
    if (yearSalary > 250000 && yearSalary <= 300000) {
      this.taxPercentEstimate = 52.6;
    }
    if (yearSalary > 300000 && yearSalary <= 350000) {
      this.taxPercentEstimate = 53.3;
    }
    if (yearSalary > 350000 && yearSalary <= 400000) {
      this.taxPercentEstimate = 53.8;
    }
    if (yearSalary > 400000 && yearSalary <= 450000) {
      this.taxPercentEstimate = 54.1;
    }
    if (yearSalary > 450000 && yearSalary <= 500000) {
      this.taxPercentEstimate = 54.4;
    }
    if (yearSalary > 500000 && yearSalary <= 550000) {
      this.taxPercentEstimate = 54.7;
    }
    if (yearSalary > 550000 && yearSalary <= 600000) {
      this.taxPercentEstimate = 54.9;
    }
    if (yearSalary > 600000 && yearSalary <= 650000) {
      this.taxPercentEstimate = 55.1;
    }
    if (yearSalary > 650000 && yearSalary <= 700000) {
      this.taxPercentEstimate = 55.2;
    }
    if (yearSalary > 700000 && yearSalary <= 750000) {
      this.taxPercentEstimate = 55.4;
    }
    if (yearSalary > 750000 && yearSalary <= 800000) {
      this.taxPercentEstimate = 55.5;
    }
    if (yearSalary > 750000 && yearSalary <= 800000) {
      this.taxPercentEstimate = 55.5;
    }
    if (yearSalary > 800000 && yearSalary <= 850000) {
      this.taxPercentEstimate = 55.6;
    }
    if (yearSalary > 850000 && yearSalary <= 900000) {
      this.taxPercentEstimate = 55.7;
    }
    if (yearSalary > 900000 && yearSalary <= 950000) {
      this.taxPercentEstimate = 55.7;
    }
    if (yearSalary > 950000 && yearSalary <= 1000000) {
      this.taxPercentEstimate = 55.8;
    }
    if (yearSalary > 1000000) {
      this.taxPercentEstimate = 60;
    }
  }

}
