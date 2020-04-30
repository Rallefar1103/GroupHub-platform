/* eslint no-console: off */

const { Model } = require(`./AbstractClasses/Model.js`);

/* FIXME: UNDER CONSTRUCTION */

class KeywordLink extends Model {
  constructor(req) {
    super(req);
    this.elementType = `keyword_link`;
    this.table = `keyword_link`;

    if (this.validRequest(req)) {
      this.idGroup = req.session.idGroup;
      this.idUser  = req.session.idUser;
      // this.idDocument?
      // this.idSection?
      this.loggedIn = req.session.loggedIn;
      switch (req.method) {
        case `GET`: case `UPDATE`: case `DELETE`:
          this.idColumnName = `ID_KEYWORD_LINK`;
          this.idQuery      = req.params.idQuery;
          break;
        case `POST`:
          // none yet
          break;
        default: break;
      }
    }
  }

  // TODO: Objektet eksistere formelt set ikke, da det ikke er sin egen tabel.
  /* Formål: At kunne oprette den givne model i databasen ud fra posted data fra en form.
             Der bliver desuden automatisk oprettet de forskellige dependencies/foreign keys som objektet tilhører.
   * Input : Et objekt oprettet med et request med postdata i body samt user/group data i session
   * Output: True hvis queren inserter, ellers false hvis der sker en fejl.
   */
  async insertToDatabase() {
    try {
      /*
      await this.query(`ID_USER_GROUP = "${this.idGroup}" `
                 + `AND ID_USER = "${this.idUser}"`);
      */
      throw new Error(`Keyword_link er IKKE implementeret som sit eget selvstændige objekt med selvstændig tabel!`);
    }
    catch (error) {
      console.log(error);
      return false;
    }
    return true;
  }
}
module.exports = {
  KeywordLink,
};