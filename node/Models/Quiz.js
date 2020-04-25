/* eslint no-console: 0 */

const { Evaluation } = require(`./AbstractClasses/Evaluation.js`);

class Quiz extends Evaluation {
  constructor(req) {
    super(req);
    this.elementType = `quiz`;
    this.table = `quiz`;

    if (this.validRequest(req)) {
      this.idGroup = req.session.idGroup;
      this.idUser  = req.session.idUser;
      // this.idDocument?
      this.loggedIn = req.session.loggedIn;
      switch (req.method) {
        case `GET`: case `UPDATE`: case `DELETE`:
          this.idColumnName = `ID_QUIZ`;
          this.idQuery = req.params.idQuery;
          break;
        case `POST`:
          this.title = req.body.quizTitle;
          this.idSection = req.body.selectSection;
          break;
        case `TEST`:
          this.elementType = `quiz`;
          this.idQuiz = undefined;
          this.idDocument = undefined;
          this.idSection = undefined;
          this.title = undefined;
          this.keywords = undefined;
          break;
        default: break;
      }
    }
  }

  async insertToDatabase() {
    try {
      await this.query(`ID_USER_GROUP = "${this.idGroup}" `
                 + `AND ID_USER = "${this.idUser}" `
                 + `AND ID_DOCUMENT = "${this.idDocument}" `
                 + `AND ID_DOCUMENT_SECTION = "${this.idSection}" `
                 + `AND TITLE = "${this.title}"`);
    }
    catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}
module.exports = {
  Quiz,
};
