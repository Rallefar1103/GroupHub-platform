/* eslint no-console: off */
const tape = require(`tape`);
const testDecorater = require(`tape-promise`).default;
const test = testDecorater(tape);
const { ParseSql } = require(`../../../node/Database/ParseSQL`);
const p = new ParseSql();
let actual = true;
let expected = true;


test(`Test af parse i node/Database`, (assert) => {
  expected = [{
    elementtype: `Not set`,
    iddocument: `00000000-00000-0000-0000-000000000000`,
    iddocument_section: `00000000-00000-0000-0000-000000000000`,
    idquiz: `00000000-00000-0000-0000-000000000000`,
    idflashcard: `00000000-00000-0000-0000-000000000000`,
    idquestion: `00000000-00000-0000-0000-000000000000`,
    section_number: `0`,
    title: `Not set`,
    content: `Not set`,
    teaser: `Not set`,
    keywords: `Not set`,
    question: `Not set`,
    answer1: `Not set`,
    answer2: `Not set`,
    answer3: `Not set`,
    answer4: `Not set`,
    correctness: `0000`,
  }];
  actual = p.parse([]);

  assert.deepEqual(actual, expected,
    `{Forventet: ${expected} Reel: ${actual}} Metoden skal kunne returnere et multiobjekt, når den modtager et array med et tomt objekt i`);

  assert.end();
});

test(`Test af parseSection i node/Database`, (assert) => {
  expected = {
    elementtype: `section`,
    iddocument: `0f6ed223-6dda-11ea-9983-2c4d54532c7a`,
    iddocument_section: `78c14a9a-6f59-11ea-9983-2c4d54532c7a`,
    section_number: 9.9,
    title: `fiktiv viden`,
    content: `lidt tekst 3`,
    teaser: `lidt tekst 3`,
    keywords: undefined,
  };
  actual = p.parseSection({
    iddocument_section: `78c14a9a-6f59-11ea-9983-2c4d54532c7a`,
    iddocument: `0f6ed223-6dda-11ea-9983-2c4d54532c7a`,
    section_number: 9.9,
    section_title: `fiktiv viden`,
    section_teaser: null,
    section_content: `lidt tekst 3`,
    elementtype: `section`,
  });

  assert.deepEqual(actual, expected,
    `{Forventet: ${expected} Reel: ${actual}} Metoden skal kunne returnere en parset version af inputtet`);

  assert.end();
});
