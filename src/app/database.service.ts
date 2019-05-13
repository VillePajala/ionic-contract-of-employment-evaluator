import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  contracts : any = [];
  db : SQLiteObject;

  constructor(private sqlite : SQLite, private platform : Platform) {
    this.connectToDatabase();
  }

  connectToDatabase = () : void => {
    this.platform.ready().then(async () => {
      this.db = await this.sqlite.create({
                                      name : 'data.db',
                                      location : 'default'
                                         });

      await this.db.executeSql("CREATE TABLE IF NOT EXISTS contracts(id INTEGER PRIMARY KEY, contractName TEXT, contractSalary DOUBLE, yearlyBonus DOUBLE, contractTax DOUBLE, taxPaid DOUBLE, netSalary DOUBLE, timestamp DOUBLE);", []);
      this.updateList();
    });
  }

  updateList = async () : Promise<any> => {
    let result = await this.db.executeSql("SELECT * FROM contracts", []);
    this.contracts = [];
    console.log(result)

    for (let i = 0; i < result.rows.length; i++) {
      this.contracts.push({
                            id : result.rows.item(i).id,
                            contractName : result.rows.item(i).contractName,
                            contractSalary : result.rows.item(i).contractSalary,
                            yearlyBonus : result.rows.item(i).yearlyBonus,
                            contractTax : result.rows.item(i).contractTax,
                            taxPaid : result.rows.item(i).taxPaid,
                            netSalary : result.rows.item(i).netSalary,
                            timestamp : result.rows.item(i).timestamp,
                        });
    } 
  }

  newContract = async (contract) : Promise<any> => {
    await this.db.executeSql("INSERT INTO contracts(contractName, contractSalary, yearlyBonus, contractTax, taxPaid, netSalary, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?);", [contract.contractName, contract.contractSalary, contract.yearlyBonus, contract.contractTax, contract.taxPaid, contract.netSalary, contract.timestamp]);
    this.updateList();
  } 

  deleteContract = async (id) : Promise<any> => {
    await this.db.executeSql("DELETE FROM contracts WHERE timestamp = ?;", [id]);
    this.updateList();
  } 

}
