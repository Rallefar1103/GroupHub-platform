/* eslint-disable guard-for-in */
/* eslint no-console: off */
const { User } = require(`../Models/User`);
const { Group } = require(`../Models/Group`);

/* Controllere for sessions
 * Omdirigere altid til `/` (som det står nu)
 */

class SessionController {
  constructor(root) {
    this.name = `SessionController`;
    this.root = root;
  }

  /* Formål: At validere et login og oprette brugerens session som den bruger der er logget ind med
   * Input : username og password
   * Output: redirect til `/`
   */
  async userSession(req, res) {
    const currentUser = new User(req);
    let data;
    try{
      data = await currentUser.loginValid();
      console.log(`data:`);
      console.log(data[0]);
    }
    catch{
      currentUser.connect.end();
      res.redirect(204, `/dbdown`);
    }
    
    if (data[0]) {
      req.session.idUser = data[0].idUser;
      req.session.loggedIn = true;
      req.session.username = data[0].username;
      currentUser.connect.end();
      res.redirect(`/access/view/groups`);
    }
    else { // Hvis queriet returnere et tomt array (aka. ingen user fra loginValid())
      currentUser.connect.end();
      res.redirect(`/access/register`); // FIXME: Statuskode indsættes
    }
  }

  /* Formål: At oprette den session som bestemmer hvilken gruppe brugeren er tilkoblet.
   * Input : et groupId
   * Output: redirect til `/`
   */
  async groupSession(req, res) {
    const G = new Group(req);
    G.idGroup = req.params.idQuery;
    const data = await G.getThisGroupData();
    if (data) {
      req.session.idGroup = data[0].idGroup;
      req.session.groupname = data[0].name;
      G.connect.end();
      res.redirect(`/`);
    }
    else {                     // FIXME: Dokumentation mangler - hvornår rammer man denne else-clause?
      G.connect.end();
      res.redirect(`/access/view/groups`); // FIXME: Statuskode indsættes
    }
  }

  /* Formål: At gøre det muligt at skifte bruger og grupperum.
   * Input : @req som indeholder en brugers session data.
   * Output: Et reset af brugerens session data, og redirect til loginpagen
   */
  logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        return console.log(err);
      }
      res.redirect(`/access/login`);
      return false;
    });
  }
}

module.exports = {
  SessionController,
};
