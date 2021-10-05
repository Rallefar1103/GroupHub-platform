# P2-vidensdeling

## Start server:
node main.js

## Test
### Alle test:
node_modules\.bin\tape tests/**/test.*.js | node_modules\.bin\tap-spec
### mac version
./node_modules/.bin/tape tests/**/test.*.js | ./node_modules/.bin/tap-spec

### Backend test:
node_modules\.bin\tape tests/backend/**/test.*.js | node_modules\.bin\tap-spec

### Frontend dokument test:
node_modules\.bin\tape tests/frontend/test.*.js | node_modules\.bin\tap-spec

### Frontend meta test:
node_modules\.bin\tape tests/frontend/meta/test.*.js | node_modules\.bin\tap-spec

### Realtime test:
nodemon tests/backend_eller_frontend/mappeMedDinTest/test.filNavn.js | .\node_modules\.bin\tap-spec

## Correct Eksport:
module.exports = {
  functionOne,
  functionTwo,
  objectOne,
  objectTwo
};

## Node moduler
Run`npm install` to install all dependencies.

