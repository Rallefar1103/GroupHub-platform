const { Evaluation } = require(`../Evaluation/Evaluation.js`);

/* UNDER CONSTRUCTION */

class Flashcard extends Evaluation {
  /* UNDER CONSTRUCTION */
  constructor(request) {
    super();
    this.elementtype = `flashcard`;
    this.table = `flashcard`;
    this.idfalshcard = `Not set`;
    this.concept = `Not set`;// begreb
    this.definition = `Not set`;
    // correctness er en binær repræsentation af svarernes sandhadsværdi "0001" betyder at answers[3] i er korrekt de andre er false!

    this.request = request;
    this.queryId = request !== undefined ? request.params.queryId : undefined;
  }

  // FIXME: virker ikke!!
  // hent flashcard indhold for det pågældende idflashcard
  // input: idflashcard
  // output: array med 1 element indeholdende et flashcard
  async getFlashcard() {
    return this.query(`SELECT *`, `idflashcard = "${this.queryId}"`)
      .then((result) => result)
      .catch((error) => error);
  }
}
module.exports = {
  Flashcard,
};
