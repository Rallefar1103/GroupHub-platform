/* eslint no-console: off */

const { Model } = require(`./AbstractClasses/Model.js`);

/* KeywordLink er den klasse der holder styr på alle de links som et keyword har
 * KeywordLink kan dermed sikre flere links til forskellige dokumenter, section og evalueringer for samme keyword
 */

class KeywordLink extends Model {
  /* Alle keywordLinkType/Col og Table er hentet fra ParseSql! */
  constructor(req) {
    super(req);
    this.elementType = `${this.keywordLinkType}`;
    this.table = `${this.keywordLinkTable}`;

    this.idKeyword = req.idKeyword === undefined ? `` : req.idKeyword;
    this.idDocument = req.idDocument === undefined ? `` : req.idDocument;
    this.idSection = req.idSection === undefined ? `` : req.idSection;
    this.idEvaluation = req.idEvaluation === undefined ? `` : req.idEvaluation;
    this.idQuizQuestion = req.idQuizQuestion === undefined ? `` : req.idQuizQuestion;
    this.idFlashcard = req.idFlashcard === undefined ? `` : req.idFlashcard;
  }
}

module.exports = {
  KeywordLink,
};
