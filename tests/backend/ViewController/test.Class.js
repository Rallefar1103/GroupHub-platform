const tape = require(`tape`);
const testDecorater = require(`tape-promise`).default;

const test = testDecorater(tape);
const { ViewController } = require(`../../../node/ViewController/ViewController.js`);
let actual = true;
let expected = true;
let object = new ViewController();

test(`Test af ViewController Klassen i node/ViewController`, (assert) => {
  assert.equal(actual, expected, `Skulle gerne være oprettet.`);

  object = new ViewController();
  actual = object.name;
  expected = `ViewController`;

  assert.equal(actual, expected, `{Forventet: ${expected} Reel: ${actual}} Klassen skulle gerne have navn efter sig selv`);

  assert.end();
});
