/* eslint no-console: off */
const mysql = require(`mysql`);

class Database {
  constructor() {
    this.connect = mysql.createConnection({
      host: `213.32.247.201`,
      user: `ADMIN`,
      port: `3306`,
      password: `Admin123!`,
      database: `p2`,
    });
    this.table = `database`;
    this.optionalValue = `optionalValue`
    this.query = `*/rows/rowUnique/values/valueUnique` + `column1(${this.optionalValue})` + `column2(${this.optionalValue})` `ètc.`;
  }

  info() {


    return false;
  }

  parser(method) {

    return false;
  }

  get(choice, queries, objects) {
    return new Promise((resolve, reject) => {
      console.log(`Choice = ${choice} TABLE = ${this.table} QUERIES = ${queries} `);
      console.log(`SELECT ${choice} FROM ${this.table} WHERE ${queries}`);
      this.connect.query(`SELECT ${choice} FROM ${this.table} WHERE ${queries}`, objects,
        (error, result) => {
          if (error) {
            console.log(`Here at node/Database/Database.js-query the error \n${error.code} 
            \nand ${error.stack} should be saved in the Database`);
            reject(error);
          }
          else {
            resolve(result);
          }
        });
    });
  }

  /* Virker ikke endnu */
  post(table, queries, objects) {
    return new Promise((resolve, reject) => {
      this.connect.query(`INSERT INTO ${table}${queries} VALUES ${objects}`,
        (error, result) => {
          if (error) {
            console.log(`Here at node/Database/Database.js-query the error \n${error.code} 
            \nand ${error.stack} should be saved in the Database`);
            reject(error);
          }
          else {
            resolve(result);
          }
        });
    });
  }

  /* Virker ikke endnu */
  put(table, queries, objects) {
    return new Promise((resolve, reject) => {
      this.connect.query(`DOESNT WORK ${table}${queries}${objects}`,
        (error, result) => {
          if (error) {
            console.log(`Here at node/Database/Database.js-query the error \n${error.code} 
            \nand ${error.stack} should be saved in the Database`);
            reject(error);
          }
          else {
            resolve(result);
          }
        });
    });
  }

  /* Virker ikke endnu */
  delete(table, queries, objects) {
    return new Promise((resolve, reject) => {
      this.connect.query(`DOESNT WORK ${table}${queries}${objects}`,
        (error, result) => {
          if (error) {
            console.log(`Here at node/Database/Database.js-query the error \n${error.code} 
            \nand ${error.stack} should be saved in the Database`);
            reject(error);
          }
          else {
            resolve(result);
          }
        });
    });
  }
}


module.exports = {
  Database,
};
