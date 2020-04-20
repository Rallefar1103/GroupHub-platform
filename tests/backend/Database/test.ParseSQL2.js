/* eslint no-console: off */
// nodemon tests/backend/Database/test.ParseSQL.js | .\node_modules\.bin\tap-spec

const tape = require(`tape`);
const testDecorater = require(`tape-promise`).default;
const test = testDecorater(tape);
const { ParseSql } = require(`../../../node/Models/AbstractClasses/ParseSQL`);
const p = new ParseSql();
let actual = true;
let expected = true;
const { Document } = require(`../../../node/Models/Document`);
const { Section } = require(`../../../node/Models/Section`);
const { Quiz } = require(`../../../node/Models/Quiz`);
const { QuizQuestion } = require(`../../../node/Models/QuizQuestion`);
const { Flashcard } = require(`../../../node/Models/Flashcard`);
const { Keyword } = require(`../../../node/Models/Keyword`);
const { User } = require(`../../../node/Models/User`);
const { TestData } = require(`../../../node/Models/TestData`);
// const req = { session: {}, params: {}, body: {} };
const testData = new testData();

/* 0 test af parseArrayOfObjects() på data som er ukendt for parseren */
/* 0.0 - 0.6 */

test(`Test 0.x af ParseSQL i node/Database`, (assert) => {
  console.log(`Test af parseArrayOfObjects() metoden med inputData som er ukendt for parseren`);
  // Tests a første if-statement
  reset();
  const testThis = [{ data: `data` }, 1, 0, true, false, `hejse dejsa`];

  testThis.forEach((inputData, i) => {
    expected = inputData;
    reset();
    actual = p.parseArrayOfObjects(inputData);
    console.log(`test 0.${i} if in->actual == expected`);
    // console.log(inputData, actual, `==`, expected);
    // console.log(expected);
    assert.deepEqual(actual, expected,
      `{0.${i} Forventet: ${expected} Reel: ${actual}} Metoden skal kunne returnere et for parseren ukendt input,
     som ikke er et array, uden at ændre i det og logge en warning i processen`);
  });

  // reset();
  // const inputData = 1;
  // expected = 1;
  // actual = p.parseArrayOfObjects(1);
  // assert.deepEqual(actual, expected,
  //   `{Forventet: ${expected} Reel: ${actual}} Metoden skal kunne returnere arbitrÃ¦rt input,
  //      som ikke er et array, uden at Ã¦ndre i det og logge en warning i processen`);

  //   reset();
  //   expected = true;
  //   actual = p.parseArrayOfObjects(true);
  //   assert.deepEqual(actual, expected,
  //     `{Forventet: ${expected} Reel: ${actual}} Metoden skal kunne returnere arbitrÃ¦rt input,
  //      som ikke er et array, uden at Ã¦ndre i det og logge en warning i processen`);

  //   reset();
  //   expected = false;
  //   actual = p.parseArrayOfObjects(false);
  //   assert.deepEqual(actual, expected,
  //     `{Forventet: ${expected} Reel: ${actual}} Metoden skal kunne returnere arbitrÃ¦rt input,
  //      som ikke er et array, uden at Ã¦ndre i det og logge en warning i processen`);

  //   reset();
  //   expected = `hejsa dejsa`;
  //   actual = p.parseArrayOfObjects(`hejsa dejsa`);
  //   assert.deepEqual(actual, expected,
  //     `{Forventet: ${expected} Reel: ${actual}} Metoden skal kunne returnere arbitrÃ¦rt input,
  //      som ikke er et array, uden at Ã¦ndre i det og logge en warning i processen`);

  //   // Tests af ukendt elementtype

  //   reset();
  //   expected = [{
  //     elementtype: `lmao`,
  //     data: `data`,
  //   }];
  //   actual = p.parseArrayOfObjects([{
  //     elementtype: `lmao`,
  //     data: `data`,
  //   }]);
  //   assert.deepEqual(actual, expected,
  //     `{Forventet: ${expected} Reel: ${actual}} Metoden skal kunne returnere input af typen array,
  //      med ukendt elementtype i det indre objekt, uden at Ã¦ndre i det og logge en warning i processen`);

  //   console.log(`Test af parseSection() metoden`);
  //   // Test uden teaser
  //   assert.deepEqual(actual, expected,
  //     `{Forventet: ${expected} Reel: ${actual}} Metoden skal kunne returnere en parset version af inputtet med en selvkonstrueret teaser`);

  assert.end();
});


// nodemon tests/backend/Database/test.ParseSQL.js | .\node_modules\.bin\tap-spec

/* 1 test af de enkelte parse funktioner */

/* 1.1 */
// TODO:
// TESTvAF PARSE DOCUMENT
test(`Test 1. af parseXXXXXX() i node/Database ved elementtype `, (assert) => {
  console.log(`1.x test af de enkelte parse funktioner`);
  console.log(`Test 1.1`);


  p.reset();
  const inputData = {
    ID_DOCUMENT: `0f6ed223-6dda-11ea-9983-2c4d54532c7a`,
    DOCUMENT_TITLE: `fiktiv viden`,
    ELEMENT_TYPE: `document`,
  };
  expected = {
    elementtype: `document`,
    idDocument: `0f6ed223-6dda-11ea-9983-2c4d54532c7a`,
    title: `fiktiv viden`,
  };

  actual = p.parseDocument(inputData);

  // console.log(`Test 1.1 parseDOCUMENT()`);
  assert.deepEqual(actual, expected,
    `(1.1){ Metoden skal kunne returnere en parset version af  DOCUMENT-data`);
  assert.end();
});

/* 1.2 */
/* SECTION */
// Test med teaser
test(`Test 1. af parseXXXXXX() i node/Database ved elementtype section `, (assert) => {
  p.reset();
  const inputData = {
    ID_DOCUMENT_SECTION: `78c14a9a-6f59-11ea-9983-2c4d54532c7a`,
    ID_DOCUMENT: `0f6ed223-6dda-11ea-9983-2c4d54532c7a`,
    SECTION_NUMBER: 9.9,
    SECTION_TITLE: `fiktiv viden`,
    SECTION_TEASER: `En lille tisser`,
    SECTION_CONTENT: `lidt tekst 3`,
    ELEMENT_TYPE: `section`,
  };
  expected = {
    elementtype: `section`,
    idDocument: `0f6ed223-6dda-11ea-9983-2c4d54532c7a`,
    idSection: `78c14a9a-6f59-11ea-9983-2c4d54532c7a`,
    sectionNumber: 9.9,
    title: `fiktiv viden`,
    content: `lidt tekst 3`,
    teaser: `En lille tisser`,
    keywords: undefined,
  };

  actual = p.parseSection(inputData);

  console.log(`Test 1.2 parseSection()`);
  assert.deepEqual(actual, expected,
    `(1.2){ Metoden skal kunne returnere en parset version af  SECTION-data`);

  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);
  assert.end();
});

/* 1.3 */
/* QUIZ */
test(`Test 1.3 af parseQuiz() i node/Database ved elementtype quiz`, (assert) => {
  const inputData = {
    ID_QUIZ: `0f6ed223-6dda-11ea-9983-2c4d54532c7a`,
    ID_DOCUMENT: `0f6ed223-6dda-11ea-9983-2c4d54532c7a`,
    ID_DOCUMENT_SECTION: `78c14a9a-6f59-11ea-9983-2c4d54532c7a`,
    SECTION_TITLE: `fiktiv viden`,
    ELEMENT_TYPE: `quiz`,
  };
  expected = {
    elementtype: `quiz`,
    idQuiz: `0f6ed223-6dda-11ea-9983-2c4d54532c7a`,
    idDocument: `0f6ed223-6dda-11ea-9983-2c4d54532c7a`,
    idDocumentSection: `78c14a9a-6f59-11ea-9983-2c4d54532c7a`,
    title: `fiktiv viden`,
    keywords: undefined,
  };
  actual = p.parseQuiz(inputData);

  console.log(`Test 1.3 parseQuiz()`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(1.3){ Metoden skal kunne returnere en parset version af QUIZ data`);

  assert.end();
});

/* 1.4 */
test(`Test 1.4 af parseQuizQuestion() i node/Database ved elementtype quiz_question`, (assert) => {
  const inputData = {
    ID_QUIZ_QUESTION: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_QUIZ: `11111111-aaaa-bbbb-1111-111111111111`,
    QUESTION: `hvad er?`,
    ANSWER_1: `ans1`,
    ANSWER_2: `ans2`,
    ANSWER_3: `ans3`,
    ANSWER_4: `ans4`,
    CORRECT_ANSWER: `0000`,
    ELEMENT_TYPE: `quiz_question`,
  };

  expected = {
    idQuestion: `11111111-aaaa-bbbb-1111-111111111111`,
    idQuiz: `11111111-aaaa-bbbb-1111-111111111111`,
    question: `hvad er?`,
    answer1: `ans1`,
    answer2: `ans2`,
    answer3: `ans3`,
    answer4: `ans4`,
    correctness: `0000`,
  };
  actual = p.parseQuizQuestion(inputData);

  console.log(`Test 1.4 parseQuizQuestion()`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(1.4){ Metoden skal kunne returnere en parset version af et QUIZ QUESTION data`);

  assert.end();
});

/* 1.5 */
test(`Test 1.5 af parseFlashcard() i node/Database ved elementtype flashcard`, (assert) => {
  const inputData =  {
    ID_FLASHCARD: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_USER: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_DOCUMENT: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_DOCUMENT_SECTION: `11111111-aaaa-bbbb-1111-111111111111`,
    CONCEPT: `hvad er?`,
    DEFINITION: `ans1`,
    CORRECT_ANSWER: `1`,
    ELEMENT_TYPE: `flashcard`,
  };
  expected = {
    elementtype: `flashcard`,
    idFlashcard: `11111111-aaaa-bbbb-1111-111111111111`,
    idUser: `11111111-aaaa-bbbb-1111-111111111111`,
    idDocument: `11111111-aaaa-bbbb-1111-111111111111`,
    idDocumentSection: `11111111-aaaa-bbbb-1111-111111111111`,
    concept: `hvad er?`,
    definition: `ans1`,
    correctness: `1`,

  };
  actual = p.parseFlashcard(inputData);

  console.log(`Test 1.5 parseFlashcard()`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(1.5){ Metoden skal kunne returnere en parset version af et FLASHCARD data`);

  assert.end();
});

/* 1.6 */
test(`Test 1.6 af parseKeyword() i node/Database ved elementtype keyword`, (assert) => {
  const inputData = {
    ID_KEYWORD: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_DOCUMENT: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_DOCUMENT_SECTION: `11111111-aaaa-bbbb-1111-111111111111`,
    KEYWORD: `keyword Test`,
    ELEMENT_TYPE: `keyword`,
  };
  expected = {
    idKeyword: `11111111-aaaa-bbbb-1111-111111111111`,
    idDocument: `11111111-aaaa-bbbb-1111-111111111111`,
    idDocumentSection: `11111111-aaaa-bbbb-1111-111111111111`,
    keyword: `keyword Test`,
    elementtype: `keyword`,
  };
  actual = p.parseKeyword(inputData);

  console.log(`Test 1.6 parseKeyword()`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(1.6){ Metoden skal kunne returnere en parset version af et KEYWORD data`);

  assert.end();
});

/* 1.7 */
test(`Test 1.7 af parseUser() i node/Database ved elementtype user`, (assert) => {
  const inputData = {
    ELEMENT_TYPE: `user`,
    ID_USER: `11111111-aaaa-bbbb-1111-111111111111`,
    USER_NAME: `Test user`,
    PASSWORD: `****`,
    FIRST_NAME: `test fornavn`,
    LAST_NAME: `test efternavn`,
    EMAIL: `test@email.com`,
    STUDY_SUBJECT: `software`,
    SEMESTER: `2`,
    UNIVERSITY: `MIT`,
  };
  expected = {
    elementtype: `user`,
    idUser: `11111111-aaaa-bbbb-1111-111111111111`,
    userName: `Test user`,
    // password: `****`,
    firstName: `test fornavn`,
    lastName: `test efternavn`,
    email: `test@email.com`,
    studySubject: `software`,
    semester: `2`,
    university: `MIT`,
  };

  actual = p.parseUser(inputData);

  console.log(`Test 1.7 parseUser()`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(1.7){ Metoden skal kunne returnere en parset version af USER data`);

  assert.end();
});


/* 2.x test af parseArrayOfObjects() funktionen som switcher pÃ¥ indkommende elementtypes */
/* 2.1 */
/* DOCUMENT */
test(`Test 2.1 af parseArrayOfObjects(DOCUMENT) i node/Database`, (assert) => {
  console.log(`2.x Test af parseArrayOfObjects()`);

  console.log(`Test 2.1`);
  p.reset();
  const inputData = [{
    ID_DOCUMENT: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_USER: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_USER_GROUP: `11111111-aaaa-bbbb-1111-111111111111`,
    TITLE: `Test Title`,
    ELEMENT_TYPE: `document`,
  }];
  expected = [
    {
      idDocument: `11111111-aaaa-bbbb-1111-111111111111`,
      idUser: `11111111-aaaa-bbbb-1111-111111111111`,
      idUserGroup: `11111111-aaaa-bbbb-1111-111111111111`,
      title: `Test Title`,
      elementtype: `document`,
    },
  ];

  actual = p.parseArrayOfObjects(inputData);

  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(2.1){ Metoden skal kunne returnere en parset version af DOCUMENT data`);

  assert.end();
});

/* 2.2 */
// SECTION
test(`Test 2.2 af parseArrayOfObjects() i node/Database`, (assert) => {
  p.reset();
  const inputData =  [{
    ID_DOCUMENT_SECTION: `78c14a9a-6f59-11ea-9983-2c4d54532c7a`,
    ID_DOCUMENT: `0f6ed223-6dda-11ea-9983-2c4d54532c7a`,
    SECTION_NUMBER: 9.9,
    SECTION_TITLE: `fiktiv viden`,
    SECTION_TEASER: null,
    SECTION_CONTENT: `lidt tekst 3`,
    ELEMENT_TYPE: `section`,
  }];
  expected = [{
    elementtype: `section`,
    idDocument: `0f6ed223-6dda-11ea-9983-2c4d54532c7a`,
    idSection: `78c14a9a-6f59-11ea-9983-2c4d54532c7a`,
    sectionNumber: 9.9,
    title: `fiktiv viden`,
    content: `lidt tekst 3`,
    teaser: `lidt tekst 3`,
    keywords: undefined,
  }];

  actual = p.parseArrayOfObjects(inputData);

  console.log(`Test 2.2`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(2.2){ Metoden skal kunne returnere en parset version af SECTION data`);

  assert.end();
});

/* 2.3 */
// QUIZ
test(`Test 2.3 af parseArrayOfObjects() i node/Database ved elementtype quiz`, (assert) => {
  p.reset();
  const inputData = [{
    ID_QUIZ: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_DOCUMENT: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_DOCUMENT_SECTION: `11111111-aaaa-bbbb-1111-111111111111`,
    SECTION_TITLE: `fiktiv quiz viden`,
    ELEMENT_TYPE: `quiz`,
  }];
  expected = [{
    elementtype: `quiz`,
    idQuiz: `11111111-aaaa-bbbb-1111-111111111111`,
    idDocument: `11111111-aaaa-bbbb-1111-111111111111`,
    idDocumentSection: `11111111-aaaa-bbbb-1111-111111111111`,
    title: `fiktiv quiz viden`,
    keywords: undefined,
  }];

  actual = p.parseArrayOfObjects(inputData);

  console.log(`Test 2.3`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(2.3){ Metoden skal kunne returnere en parset version af QUIZ data`);

  assert.end();
});

/* 2.4 */
// QUIZQUESTION
test(`Test 2.4 af parseArrayOfObjects() i node/Database ved elementtype quiz_question`, (assert) => {
  p.reset();
  const inputData = [{
    ID_QUIZ_QUESTION: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_QUIZ: `11111111-aaaa-bbbb-1111-111111111111`,
    QUESTION: `hvad er?`,
    ANSWER_1: `ans1`,
    ANSWER_2: `ans2`,
    ANSWER_3: `ans3`,
    ANSWER_4: `ans4`,
    CORRECT_ANSWER: `0000`,
    ELEMENT_TYPE: `quiz_question`,
  }];
  expected = [{
    idQuestion: `11111111-aaaa-bbbb-1111-111111111111`,
    idQuiz: `11111111-aaaa-bbbb-1111-111111111111`,
    question: `hvad er?`,
    answer1: `ans1`,
    answer2: `ans2`,
    answer3: `ans3`,
    answer4: `ans4`,
    correctness: `0000`,
  }];
  actual = p.parseArrayOfObjects(inputData);

  console.log(`Test 2.4`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(2.4){ Metoden skal kunne returnere en parset version af et QUIZ QUESTION data`);

  assert.end();
});

/* 2.5 */
// FLASHCARD
test(`Test 2.5 af parseArrayOfObjects() i node/Database ved elementtype flashcard`, (assert) => {
  p.reset();

  const inputData = [{
    ID_FLASHCARD: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_USER: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_DOCUMENT: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_DOCUMENT_SECTION: `11111111-aaaa-bbbb-1111-111111111111`,
    CONCEPT: `hvad er?`,
    DEFINITION: `ans1`,
    CORRECT_ANSWER: `1`,
    ELEMENT_TYPE: `flashcard`,
  }];
  expected = [{
    elementtype: `flashcard`,
    idFlashcard: `11111111-aaaa-bbbb-1111-111111111111`,
    idUser: `11111111-aaaa-bbbb-1111-111111111111`,
    idDocument: `11111111-aaaa-bbbb-1111-111111111111`,
    idDocumentSection: `11111111-aaaa-bbbb-1111-111111111111`,
    concept: `hvad er?`,
    definition: `ans1`,
    correctness: `1`,

  }];
  actual = p.parseArrayOfObjects(inputData);

  console.log(`Test 2.5`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(2.5){ Metoden skal kunne returnere en parset version af et FLASHCARD data`);

  assert.end();
});

/* 2.6 */
// KEYWORD
test(`Test 2.6 af parseArrayOfObjects() i node/Database ved elementtype keyword`, (assert) => {
  p.reset();
  const inputData = [{
    ID_KEYWORD: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_DOCUMENT: `11111111-aaaa-bbbb-1111-111111111111`,
    ID_DOCUMENT_SECTION: `11111111-aaaa-bbbb-1111-111111111111`,
    KEYWORD: `keyword Test`,
    ELEMENT_TYPE: `keyword`,
  }];

  expected = [{
    idKeyword: `11111111-aaaa-bbbb-1111-111111111111`,
    idDocument: `11111111-aaaa-bbbb-1111-111111111111`,
    idDocumentSection: `11111111-aaaa-bbbb-1111-111111111111`,
    keyword: `keyword Test`,
    elementtype: `keyword`,
  }];

  actual = p.parseArrayOfObjects(inputData);

  console.log(`Test 2.6`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(2.6){ Metoden skal kunne returnere en parset version af KEYWORD data`);

  assert.end();
});

/* 2.7 */
// USER
test(`Test 2.7 af parseArrayOfObjects() i node/Database ved elementtype user`, (assert) => {
  p.reset();

  const inputData = [{
    ELEMENT_TYPE: `user`,
    ID_USER: `11111111-aaaa-bbbb-1111-111111111111`,
    USER_NAME: `Test user`,
    PASSWORD: `****`,
    FIRST_NAME: `test fornavn`,
    LAST_NAME: `test efternavn`,
    EMAIL: `test@email.com`,
    STUDY_SUBJECT: `software`,
    SEMESTER: `2`,
    UNIVERSITY: `MIT`,
  }];

  expected = [{
    elementtype: `user`,
    idUser: `11111111-aaaa-bbbb-1111-111111111111`,
    userName: `Test user`,
    // password: `****`,
    firstName: `test fornavn`,
    lastName: `test efternavn`,
    email: `test@email.com`,
    studySubject: `software`,
    semester: `2`,
    university: `MIT`,
  }];

  actual = p.parseArrayOfObjects(inputData);

  console.log(`Test 2.7`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(2.7){ Metoden skal kunne returnere en parset version af USER data`);

  assert.end();
});


/* 3 Test That column-names from database are the same as expected in parser */
/* 3.1 */
// DOCUMENT DB
test(`Test 3.1 af Database-setup i vores SQLdatabase, ved hentning af kolonne navne fra DOCUMENT tabellen`, async (assert) => {
  console.log(`\r\n3.x Test af de enkelte tabeller i SQL databasen\n`);

  p.reset();

  const req = { session: {}, params: {}, body: {} };
  const D =  new Document(req);
  let inputData = [];

  expected = [
    [
      { COLUMN_NAME: `ID_DOCUMENT` },
      { COLUMN_NAME: `ID_USER` },
      { COLUMN_NAME: `ID_USER_GROUP` },
      { COLUMN_NAME: `TITLE` },
      { COLUMN_NAME: `ELEMENT_TYPE` },

    ],
  ];

  inputData = await D.queryUnparsedData(`HEAD`, `COLUMN_NAME`);
  actual = [inputData];

  console.log(`Test 3.1`);
  // console.log(`Test 3.1`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(3.1){  Metoden sammenligne en U-parset version af kolonnenavne i DOCUMENT fra sql databasen`);
  assert.end();
});


// SECTION DB
/* 3.2 */
test(`Test 3.2 af Database-setup i vores SQLdatabase, ved hentning af kolonne navne fra SECTION`, async (assert) => {
  p.reset();

  const req = { session: {}, params: {}, body: {} };
  const S = new Section(req);
  let inputData = [];

  expected = [
    [
      { COLUMN_NAME: `ID_DOCUMENT_SECTION` },
      { COLUMN_NAME: `ID_DOCUMENT` },
      { COLUMN_NAME: `SECTION_TITLE` },
      { COLUMN_NAME: `ELEMENT_TYPE` },
      { COLUMN_NAME: `SECTION_NUMBER` },
      { COLUMN_NAME: `SECTION_CONTENT` },
      { COLUMN_NAME: `SECTION_TEASER` },
      { COLUMN_NAME: `KEYWORDS` },
      { COLUMN_NAME: `ID_USER_GROUP` },
    ],
  ];

  inputData = await S.queryUnparsedData(`HEAD`, `COLUMN_NAME`);

  actual = [inputData];

  console.log(`Test 3.2`);
  // console.log(`test if input->actual==expecvalues :t`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(3.2){  Metoden skal kunne returnere en U-parset version af kolonnenavne i SECTION fra sql databasen`);

  assert.end();
});


// QUIZ DB
/* 3.3 */
test(`Test 3.3 af Database-setup i vores SQLdatabase, ved hentning af kolonne navne fra quiz tabellen`, async (assert) => {
  p.reset();
  const req = { session: {}, params: {}, body: {} };
  const Q = new Quiz(req);
  let inputData = [];
  expected = [
    [
      { COLUMN_NAME: `ID_QUIZ` },
      { COLUMN_NAME: `ID_DOCUMENT` },
      { COLUMN_NAME: `ID_DOCUMENT_SECTION` },
      { COLUMN_NAME: `ELEMENT_TYPE` },
      { COLUMN_NAME: `SECTION_TITLE` },
      { COLUMN_NAME: `ID_USER_GROUP` },
    ],
  ];
  inputData = await Q.queryUnparsedData(`HEAD`, `COLUMN_NAME`);

  actual = [inputData];

  console.log(`Test 3.3`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(3.3){  Metoden skal kunne sammenligne U-parset version af en QUIZ fra sql databasen med expectet`);

  assert.end();
});


// QUIZ QUESTION DB
/* 3.4 */
test(`Test 3.4 af Database-setup i vores SQLdatabase, ved hentning af kolonne navne fra QUIZ QUESTION tabellen`, async (assert) => {
  p.reset();

  const req = { session: {}, params: {}, body: {} };
  const Qq = new QuizQuestion(req);
  let inputData = [];
  expected = [
    [
      { COLUMN_NAME: `ID_QUIZ` },
      { COLUMN_NAME: `ID_DOCUMENT` },
      { COLUMN_NAME: `ID_DOCUMENT_SECTION` },
      { COLUMN_NAME: `ELEMENT_TYPE` },
      { COLUMN_NAME: `SECTION_TITLE` },
      { COLUMN_NAME: `ID_USER_GROUP` },
    ],

  ];
  inputData = await Qq.queryUnparsedData(`HEAD`, `COLUMN_NAME`);

  actual = [inputData];  console.log(`Test 3.4`);
  // console.log(`test if input->actual==expecvalues :t`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(3.4){  Metoden skal sammenligne en U-parset version af et QUIZ QUESTION fra sql databasen med expectet`);

  assert.end();
});


// FLASHCARD DB
/* 3.5 */
test(`Test 3.5 af Database-setup i vores SQLdatabase, ved hentning af kolonne navne fra flashcard tabellen`, async (assert) => {
  p.reset();

  const req = { session: {}, params: {}, body: {} };
  const F = new Flashcard(req);
  let inputData = [];
  expected = [
    [
      { COLUMN_NAME: `ID_FLASHCARD` },
      { COLUMN_NAME: `ID_USER` },
      { COLUMN_NAME: `ID_DOCUMENT` },
      { COLUMN_NAME: `ID_DOCUMENT_SECTION` },
      { COLUMN_NAME: `CONCEPT` },
      { COLUMN_NAME: `DEFINITION` },
      { COLUMN_NAME: `ELEMENT_TYPE` },
      { COLUMN_NAME: `ID_USER_GROUP` },
    ],
  ];
  inputData = await F.queryUnparsedData(`HEAD`, `COLUMN_NAME`);
  actual = [inputData];

  console.log(`Test 3.5`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(3.5){  Metoden skal sammenligne en U-parset version af et FLASHCARD fra sql databasen`);

  assert.end();
});


// USER DB
/* 3.6 */
test(`Test 3.6 af Database-setup i vores SQLdatabase, ved hentning af kolonne navne fra User tabellen`, async (assert) => {
  p.reset();
  // arrange
  let inputData = [];
  const req = { session: {}, params: {}, body: {} };
  const U = new User(req);

  expected = [
    [
      { COLUMN_NAME: `ID_USER` },
      { COLUMN_NAME: `ID_USER_GROUP` },
      { COLUMN_NAME: `USER_NAME` },
      { COLUMN_NAME: `PASSWORD` },
      { COLUMN_NAME: `FIRST_NAME` },
      { COLUMN_NAME: `LAST_NAME` },
      { COLUMN_NAME: `EMAIL` },
      { COLUMN_NAME: `STUDY_SUBJECT` },
      { COLUMN_NAME: `SEMESTER` },
      { COLUMN_NAME: `UNIVERSITY` },
      { COLUMN_NAME: `ELEMENT_TYPE` },
    ],
  ];

  // act
  inputData = await U.queryUnparsedData(`HEAD`, `COLUMN_NAME`);
  actual = [inputData];

  // assert
  console.log(`Test 3.6`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(3.6){  Metoden skal sammenligne en U-parset version af en USER fra sql databasen med expectet`);

  assert.end();
});


// NOT FINISHED
// FIXME:
// KEYWORD DB
/* 3.7 */
test(`Test 3.7 af Database-setup i vores SQLdatabase, ved hentning af kolonne navne fra keyword tabellen`, async (assert) => {
  p.reset();

  const req = { session: {}, params: {}, body: {} };
  const K = new Keyword(req);
  let inputData = [];
  expected = [
    [
      { COLUMN_NAME: `ELEMENT_TYPE` },
      { COLUMN_NAME: `KEYWORD` },
    ],
  ];
  inputData = await K.queryUnparsedData(`HEAD`, `COLUMN_NAME`);

  actual = [inputData];

  console.log(`Test 3.7`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(3.7){  Metoden skal sammenligne en U-parset version af et KEYWORD fra sql databasen expectet`);

  assert.end();
});

/* 4.x Test første element i hver tabel i datbasen */


/* 4.1 */
// DOCUMENT DB
test(`Test 4.1 af Database-setup i vores SQLdatabase, ved hentning af 1.test-element fra DOCUMENT tabellen`, async (assert) => {
  console.log(`\r\n4.x Test af de enkelte tabeller i SQL databasen\n`);

  p.reset();

  const req = { session: {}, params: {}, body: {} };
  const D =  new Document(req);
  let inputData = [];
  const  TestDocument = testData.document();

  expected = [
    [
      {
        TestDocument,
      },
      // {
      //   elementType: `document`,
      //   table: `document`,
      //   idGroup: `11111111-aaaa-bbbb-1111-111111111111`,
      //   idUser: `11111111-aaaa-bbbb-1111-111111111111`,
      //   idDocument: `11111111-aaaa-bbbb-1111-111111111111`,
      //   title: `1.Testelement-title`,
      // },

    ],
  ];

  inputData = await D.query(`SELECT *`, `ID_DOCUMENT = "11111111-aaaa-bbbb-1111-111111111111"`);
  actual = [inputData];

  console.log(`Test 4.1`);
  console.log(inputData);
  // console.log(`Test 4.1`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(4.1){  Metoden sammenligne en U-parset version af kolonnenavne i DOCUMENT fra sql databasen`);
  assert.end();
});


// // SECTION DB
// /* 4.2 */
// test(`Test 4.2 af Database-setup i vores SQLdatabase, ved hentning af 1.test-element fra SECTION`, async (assert) => {
//   p.reset();

//   const req = { session: {}, params: {}, body: {} };
//   const S = new Section(req);
//   let inputData = [];
//   const  TestData = testData.section();

//   expected = [
//     [
//       {
//         T,
//       },

//       {
//         elementtype: `section`,
//         idDocument: `11111111-aaaa-bbbb-1111-111111111111`,
//         idSection: `11111111-aaaa-bbbb-1111-111111111111`,
//         sectionNumber: `0`,
//         title: `1.Testelement-title`,
//         content: `1.testelement-content`,
//         teaser: `1.testelement-teaser`,
//         keywords: `1.testelement-keywords`,
//       },
//     ],
//   ];

//   inputData = await S.query(`SELECT *`, `ID_DOCUMENT_SECTION = "11111111-aaaa-bbbb-1111-111111111111"`);

//   actual = [inputData];

//   console.log(`Test 4.2`);
//   // console.log(`test if input->actual==expecvalues :t`);
//   // console.log(inputData, `->`, actual, `==`, expected);

//   assert.deepEqual(actual, expected,
//     `(4.2){  Metoden skal kunne returnere en U-parset version af kolonnenavne i SECTION fra sql databasen`);

//   assert.end();
// });


// QUIZ DB
/* 4.3 */
test(`Test 4.3 af Database-setup i vores SQLdatabase, ved hentning af 1.test-element fra quiz tabellen`, async (assert) => {
  p.reset();
  const req = { method: `TEST`, session: {idGroup: testData.idGroup}, params: {}, body: {} };
  const Q = new Quiz(req);
  let inputData = [];
  expected = [
    [
      { COLUMN_NAME: `ID_QUIZ` },
      { COLUMN_NAME: `ID_DOCUMENT` },
      { COLUMN_NAME: `ID_DOCUMENT_SECTION` },
      { COLUMN_NAME: `ELEMENT_TYPE` },
      { COLUMN_NAME: `SECTION_TITLE` },
      { COLUMN_NAME: `ID_USER_GROUP` },
    ],
  ];
  inputData = await Q.queryUnparsedData(`HEAD`, `COLUMN_NAME`);

  actual = [inputData];

  console.log(`Test 4.3`);
  // console.log(`test values : input->actual==expectet`);
  // console.log(inputData, `->`, actual, `==`, expected);

  assert.deepEqual(actual, expected,
    `(4.3){  Metoden skal kunne sammenligne U-parset version af en QUIZ fra sql databasen med expectet`);

  assert.end();
});


// // QUIZ QUESTION DB
// /* 4.4 */
// test(`Test 4.4 af Database-setup i vores SQLdatabase, ved hentning af 1.test-element fra QUIZ QUESTION tabellen`, async (assert) => {
//   p.reset();

//   const req = { session: {}, params: {}, body: {} };
//   const Qq = new QuizQuestion(req);
//   let inputData = [];
//   expected = [
//     [
//       { COLUMN_NAME: `ID_QUIZ` },
//       { COLUMN_NAME: `ID_DOCUMENT` },
//       { COLUMN_NAME: `ID_DOCUMENT_SECTION` },
//       { COLUMN_NAME: `ELEMENT_TYPE` },
//       { COLUMN_NAME: `SECTION_TITLE` },
//       { COLUMN_NAME: `ID_USER_GROUP` },
//     ],

//   ];
//   inputData = await Qq.queryUnparsedData(`HEAD`, `COLUMN_NAME`);

//   actual = [inputData];  console.log(`Test 4.4`);
//   // console.log(`test if input->actual==expecvalues :t`);
//   // console.log(inputData, `->`, actual, `==`, expected);

//   assert.deepEqual(actual, expected,
//     `(4.4){  Metoden skal sammenligne en U-parset version af et QUIZ QUESTION fra sql databasen med expectet`);

//   assert.end();
// });


// // FLASHCARD DB
// /* 4.5 */
// test(`Test 4.5 af Database-setup i vores SQLdatabase, ved hentning af 1.test-element fra flashcard tabellen`, async (assert) => {
//   p.reset();

//   const req = { session: {}, params: {}, body: {} };
//   const F = new Flashcard(req);
//   let inputData = [];
//   expected = [
//     [
//       { COLUMN_NAME: `ID_FLASHCARD` },
//       { COLUMN_NAME: `ID_USER` },
//       { COLUMN_NAME: `ID_DOCUMENT` },
//       { COLUMN_NAME: `ID_DOCUMENT_SECTION` },
//       { COLUMN_NAME: `CONCEPT` },
//       { COLUMN_NAME: `DEFINITION` },
//       { COLUMN_NAME: `ELEMENT_TYPE` },
//       { COLUMN_NAME: `ID_USER_GROUP` },
//     ],
//   ];
//   inputData = await F.queryUnparsedData(`HEAD`, `COLUMN_NAME`);
//   actual = [inputData];

//   console.log(`Test 4.5`);
//   // console.log(`test values : input->actual==expectet`);
//   // console.log(inputData, `->`, actual, `==`, expected);

//   assert.deepEqual(actual, expected,
//     `(4.5){  Metoden skal sammenligne en U-parset version af et FLASHCARD fra sql databasen`);

//   assert.end();
// });


// // USER DB
// /* 4.6 */
// test(`Test 4.6 af Database-setup i vores SQLdatabase, ved hentning af 1.test-element fra User tabellen`, async (assert) => {
//   p.reset();
//   // arrange
//   let inputData = [];
//   const req = { session: {}, params: {}, body: {} };
//   const U = new User(req);

//   expected = [
//     [
//       { COLUMN_NAME: `ID_USER` },
//       { COLUMN_NAME: `ID_USER_GROUP` },
//       { COLUMN_NAME: `USER_NAME` },
//       { COLUMN_NAME: `PASSWORD` },
//       { COLUMN_NAME: `FIRST_NAME` },
//       { COLUMN_NAME: `LAST_NAME` },
//       { COLUMN_NAME: `EMAIL` },
//       { COLUMN_NAME: `STUDY_SUBJECT` },
//       { COLUMN_NAME: `SEMESTER` },
//       { COLUMN_NAME: `UNIVERSITY` },
//       { COLUMN_NAME: `ELEMENT_TYPE` },
//     ],
//   ];

//   // act
//   inputData = await U.queryUnparsedData(`HEAD`, `COLUMN_NAME`);
//   actual = [inputData];

//   // assert
//   console.log(`Test 4.6`);
//   const nextSection = new Section({}, { idSection: `røvOgNøgler`, idUser: `migselv` });
//   console.log(nextSection);
//   // console.log(`test values : input->actual==expectet`);
//   // console.log(inputData, `->`, actual, `==`, expected);

//   assert.deepEqual(actual, expected,
//     `(4.6){  Metoden skal sammenligne en U-parset version af en USER fra sql databasen med expectet`);

//   assert.end();
// });


// // function testArrayOfObjects(array1, array2, callback) {
// //   array1[0].forEach((obj1, i) => {
// //     const obj2 = array2[0][i];
// //     const array1Val = obj1[Object.keys(obj1)[0]];
// //     const array2Val = obj2[Object.keys(obj1)[0]];

// //     callback(array1Val, array2Val);
// //   });
// // }

// function reset() {
//   p.parsedData = [];
// }
