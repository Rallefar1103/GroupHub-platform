/* eslint-disable guard-for-in */
/* eslint no-console: off */
const path = require(`path`);
const { Section } = require(`../Section/Section`);
const { Quiz } = require(`../Evaluation/Quiz`);
const { Flashcard } = require(`../Evaluation/Flashcard`);
const { User } = require(`../User/User`);

/* UNDER CONSTRUCTION */

class ViewController {
  /* UNDER CONSTRUCTION */
  constructor(req) {
    this.name = `ViewController`;
    this.ejs = {};
    this.validated = false;
    this.root = __dirname.slice(0, -(`node/${this.name}`.length));
    this.request = req;
  }

  /* Dette er lavet for at kunne teste meta data fra SQL databasen */
  async head(req, res) {
    const object = new User(req);
    console.log(object);
    console.log(await object.query(`HEAD`));
    res.send(`It worked`);
  }

  /* UNDER CONSTRUCTION */
  homePage(req, res) {
    this.ejs = path.join(`${this.root}/www/views/home.ejs`);
    res.render(this.ejs);
  }

  /* UNDER CONSTRUCTION */
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

  /* UNDER CONSTRUCTION */
  loginPage(req, res) {
    if (req.session.loggedin === true) {
      this.ejs = path.join(`${this.root}/www/views/home.ejs`);
    }
    else {
      this.ejs = path.join(`${this.root}/www/views/login.ejs`);
    }
    res.render(this.ejs);
  }

  // viser alle tilg�ngelige evalueringer fra databasen p� siden evalueringer.ejs
  // input : non
  // output: Array af Alle tilg�ngelige evalueringer i databasen b�de quizzes og flashcards sendes som
  //         arrays :flashcards og quizzes til /www/views/evalueringer.ejs
  /* UNDER CONSTRUCTION */
  async evalueringerPage(req, res) {
    const quiz = new Quiz(req);
    const quizData = await quiz.getEverything();

    const flashcard = new Flashcard(req);
    const flashcardData = await flashcard.getEverything();

    this.ejs = path.join(`${this.root}/www/views/evalueringer.ejs`);
    res.render(this.ejs, { flashcards: flashcardData, quizzes: quizData });
  }

  // viser indholdet af enten et flashcard eller en quizz vha. siden evalueringerFlashcard.ejs eller
  // evalueringerQuiz.ejs.
  // input: id og en type(flashcard eller quiz) (id'et er hhv idflashcard og idquiz alt efter typen)
  // alt efter typen s� hentes quiz questions eller flashcards knyttet til det specifikke idflashcard eller idquiz.
  // output: Array hvor index 0 indeholder flashcard_data eller quiz_question data, hvilket sendes til
  // hhv /www/views/evalueringerFlashcard.ejs eller /www/views/evalueringerQuiz.ejs
  /* UNDER CONSTRUCTION */
  async quizPage(req, res) {
    const quiz = new Quiz(req);
    const data = await quiz.getQuiz();
    this.ejs = path.join(`${this.root}/www/views/evalueringerQuiz.ejs`);
    res.render(this.ejs, { quiz: data });
  }

  /* UNDER CONSTRUCTION */
  async flashcardPage(req, res) {
    const flashcard = new Flashcard(req);
    const data = await flashcard.getFlashcard();
    this.ejs = path.join(`${this.root}/www/views/evalueringerFlashcard.ejs`);
    res.render(this.ejs, { flashcard: data });
  }

  // viser alle tilg�ngelige sections fra databasen p� siden rapport.ejs
  // input : non
  // output: Array af Alle tilg�ngelige sections i databasen sendes som
  //         array: afsnit til /www/views/rapport.ejs
  /* UNDER CONSTRUCTION */
  async rapportPage(req, res) {
    const sec = new Section(req);
    const data = await sec.getEverything();
    this.ejs = path.join(`${this.root}/www/views/rapport.ejs`);
    res.render(this.ejs, { afsnit: data });
  }

  // viser alle tilg�ngelige evaluations knyttet til en bestemt section p� siden rapportafsnit.ejs
  // input : iddocument_section
  // output: Array af Alle evalueringer samt content fra en section tilknyttet en section med id = iddocument_section
  // sendes som arrays: flashcards, quizzes, section til /www/views/rapportafsnit.ejs
  /* UNDER CONSTRUCTION */
  async rapportSectionPage(req, res) {
    const sec = new Section(req);
    const data = {
      flashcards: await sec.getAllFlashcards(),
      quizzes: await sec.getAllQuizzes(),
      section: await sec.getData(),
    };
    this.ejs = path.join(`${this.root}/www/views/rapportafsnit.ejs`);
    res.render(this.ejs, { data });
  }

  /* UNDER CONSTRUCTION */
  uploadPage(req, res) {
    if (req.params.type === `evalueringer`) {
      this.ejs = path.join(`${this.root}/www/views/evalueringerUpload.ejs`);
    }
    else if (req.params.type === `rapport`) {
      this.ejs = path.join(`${this.root}/www/views/rapportUpload.ejs`);
    }
    res.render(this.ejs);
  }
}

module.exports = {
  ViewController,
};
