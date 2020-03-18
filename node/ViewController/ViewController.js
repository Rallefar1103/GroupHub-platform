const { Expert } = require(`../Expert/Expert.js`);

class ViewController {
  constructor(request) {
    this.name = `Client`;
    this.html = ``;
  }

  homePage(req, res) {
    this.html = `<a href="/about">Click here!</a>`;
    res.send(`Welcome to home with ${this.html}`);
  }

  aboutPage(req, res) {
    this.html = `This OTHER Post <a href="/form">Go to form</a>`;
    res.send(`Reading about with ${this.html}`);
  }

  businessLogicPage(req, res) {
    const Master = new Expert(req);
    /*
    const data = Master.getProfilePage();

    fetch(html);
*/
    this.html = `<p>På denne side vil du gerne vide et tilfældigt navn som er ${Master.firstname}</p>`;
    res.send(this.html);
  }
  /*
  newFeedView(req, res) {
    const feed = new Feed(req);
    const evalu = new EvalOverblik(req);

    const JSONdata = getData(feed,eval);

    fetch(this.html);
*/
  /* indsæt data i html */
/*
    res.send(html);
  }
  */
}

module.exports = {
  ViewController,
};