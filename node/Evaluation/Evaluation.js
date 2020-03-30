const { Database } = require(`../Database/Database.js`);

class Evaluation extends Database {
  constructor(request) {
    super();
    this.name = `Evaluation`;
    this.table = `quiz`;
    this.request = request;
    this.iddocument = `Not set`;
    this.elementtype = `Not set`;
    this.title = `Not set`;
  }

  async getAllEvaluations() {
    // console.log(`prøver at hente : `+ id);
    return this.query(`SELECT *`)
      .then((result) => result)
      .catch((error) => error);
  }

  async getEvalForSection(id) {
    // console.log(`prøver at hente : `+ id);
    return this.query(`SELECT *`, `iddocument = "${id}"`)
      .then((result) => result)
      .catch((error) => error);
  }

  async getQuiz(id) {
    // console.log(`prøver at hente : `+ id);
    return this.query(`SELECT *`, `idquiz = "${id}"`)
      .then((result) => result)
      .catch((error) => error);
  }

  async getFlashcard(id) {
    // console.log(`prøver at hente : `+ id);
    console.log(`Denne funktion er ikke implementeret endnu${id}`);
    // return this.query(`SELECT *`, `idflashcard = "${id}"`)
    //   .then((result) => result)
    //   .catch((error) => error);
  }

  async getKeywordsForSection(id) {
    // console.log(`prøver at hente : ` + id);
    this.table = `document_keywords`;
    return this.query(`SELECT *`, `iddocument = "${id}"`)
      .then((result) => result)
      .catch((error) => error);
  }
}


module.exports = {
  Evaluation,
};