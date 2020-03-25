/* eslint no-console: off */
const path = require(`path`);
const { Document } = require( `../Document/Document.js`);

const { User } = require(`../User/User.js`);

// Mock data til test
var sectionDatabase = {
  2.1:   {keywords: ['vidensdeling', 'feed-up', 'feed-forward'].toString()},
  2.2:   {keywords: ['studier', 'evaluering', 'formativ', 'summativ'].toString()},
  2.3:   {keywords: ['metoder', 'active recall', 'spaced repetition'].toString()},
  2.4:   {keywords: ['blabla', 'jepjepjep', 'superdupersuperduper'].toString()},
  2.5:   {keywords: ['SOTA', 'classkick', 'kahoot!'].toString()},
  2.6:   {keywords: ['SOTA', 'classkick', 'kahoot!'].toString()},
  3.1:   {keywords: ['SOTA', 'classkick', 'kahoot!'].toString()},
  3.2:   {keywords: ['SOTA', 'classkick', 'kahoot!'].toString()},
  3.3:   {keywords: ['SOTA', 'classkick', 'kahoot!'].toString()}
};

class ViewController {
  constructor(req) {
    this.name = `ViewController`;
    this.ejs = {};
    this.validated = false;
    this.root = __dirname.slice(0, -(`node/${this.name}`.length));
    this.request = req;
  }

  homePage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/home.ejs`);
    res.render(this.ejs);
  }

  registerPage(req, res) {
    const Registered = new User(req);
    if (Registered.alreadyLoggedIn()) {
      res.redirect(`/`);
    }
    else {
      this.ejs = path.join(`${this.root}/www/views/register.ejs`);
      res.render(this.ejs);
    }
  }

  loginPage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/login.ejs`);
    res.render(this.ejs);
  }

  evalueringerPage(req, res) {
    // Mock data til test
    const sectionDatabase = [
      { content: { section: 2.1, flashcard: `flashcard`, quiz: `quiz` } },
      { content: { section: 2.2, flashcard: `flashcard`, quiz: `quiz` } },
      { content: { section: 2.3, flashcard: `flashcard`, quiz: `quiz` } },
      { content: { section: 2.4, flashcard: `flashcard`, quiz: `quiz` } },
    ];

    this.ejs = path.join(`${this.root}/www/views/evalueringer.ejs`);
    res.render(this.ejs, { evalueringerContent: sectionDatabase });
  }

  evalueringerTypePage(req, res) {
    if (req.params.type === `flashcard`) {
      this.ejs = path.join(`${this.root}/www/views/evalueringerFlashcard.ejs`);
      res.render(this.ejs);
    }
    else if (req.params.type === `quiz`) {
      this.ejs = path.join(`${this.root}/www/views/evalueringerQuiz.ejs`);
      res.render(this.ejs);
    }
  }

  elementList(req, res) {
    this.ejs = path.join(`${this.root}/www/views/elementList.ejs`);
    res.render(this.ejs);
  }

  async rapportPage(req, res) {
    // Mock data til test
    const doc = new Document();
    const data = await doc.getAllSections();
    console.log(data);
    // let sections = data.map
    for (let i = 0; i < 8; i++) {
      console.log( i + " ny DATA "+ data[i].title);

    }
    let sections = [2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 3.2, 3.3];
    this.ejs = path.join(`${this.root}/www/views/rapport.ejs`);
    res.render(this.ejs, {afsnit: sections});
  }

  rapportSectionPage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/rapportafsnit.ejs`);
    res.render(this.ejs, {section: req.params.afsnit, content: sectionDatabase});
  }

  UploadPage(req, res) {
    if (req.params.type === `evalueringer`) {
      this.ejs = path.join(`${this.root}/www/views/evalueringerUpload.ejs`);
      res.render(this.ejs);
    }
    else if (req.params.type === `rapport`) {
      this.ejs = path.join(`${this.root}/www/views/rapportUpload.ejs`);
      res.render(this.ejs);
    }
  }

  RapportPost(req, res) {
    this.ejs = path.join(`${this.root}/www/views/rapportafsnit.ejs`);
    console.log(req.body.name);
    const sectionDatabase = {
      2.1: { keywords: [`vidensdeling`, `feed-up`, `feed-forward`].toString() },
      2.2: { keywords: [`studier`, `evaluering`, `formativ`, `summativ`].toString() },
      2.3: { keywords: [`metoder`, `active recall`, `spaced repetition`].toString() },
      2.4: { keywords: [`blabla`, `jepjepjep`, `superdupersuperduper`].toString() },
      2.5: { keywords: [`SOTA`, `classkick`, `kahoot!`].toString() },
      2.6: { keywords: [`SOTA`, `classkick`, `kahoot!`].toString() },
      3.1: { keywords: [`SOTA`, `classkick`, `kahoot!`].toString() },
      3.2: { keywords: [`SOTA`, `classkick`, `kahoot!`].toString() },
      3.3: { keywords: [`SOTA`, `classkick`, `kahoot!`].toString() },
    };
    res.render(this.ejs, { section: req.body.name, content: sectionDatabase });
  }

  EvalueringerPost(req, res) {
    this.ejs = path.join(`${this.root}/www/views/evalueringer.ejs`);
    res.render(this.ejs);
  }
}

module.exports = {
  ViewController,
};
