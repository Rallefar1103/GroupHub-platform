const tape = require(`tape`);
const testDecorater = require(`tape-promise`).default;

const test = testDecorater(tape);
const { Expert } = require(`../../../node/Expert/Expert.js`);

let request = {'body':{}};
let actual = true;
let expected = true;
let object = new Expert(request);

test(`Test af Expert Klassen i node/Expert`, (assert) => {
  assert.equal(actual, expected, `Testen skulle gerne være oprettet.`);

  object = new Expert(request);
  actual = object.name;
  expected = `Expert`;

  assert.equal(actual, expected, `{Forventet: ${expected} Reel: ${actual}} Klassen skulle gerne have navn efter sig selv`);

  assert.end();
});
