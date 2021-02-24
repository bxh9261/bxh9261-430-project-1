// using underscore.js
// https://underscorejs.org/
const _ = require('underscore');

const jokes = [
  { q: 'What do you call a very small valentine?', a: 'A valen-tiny!' },
  { q: 'What did the dog say when he rubbed his tail on the sandpaper?', a: 'Ruff, Ruff!' },
  { q: "Why don't sharks like to eat clowns?", a: 'Because they taste funny!' },
  { q: 'What did the boy cat say to the girl cat?', a: "You're Purr-fect!" },
  { q: "What is a frog's favorite outdoor sport?", a: 'Fly Fishing!' },
  { q: 'I hate jokes about German sausages.', a: 'Theyre the wurst.' },
  { q: 'Did you hear about the cheese factory that exploded in France?', a: 'There was nothing left but de Brie.' },
  { q: 'Our wedding was so beautiful ', a: 'Even the cake was in tiers.' },
  { q: 'Is this pool safe for diving?', a: 'It deep ends.' },
  { q: 'Dad, can you put my shoes on?', a: 'I dont think they will fit me.' },
  { q: 'Can February March?', a: 'No, but April May' },
  { q: 'What lies at the bottom of the ocean and twitches?', a: 'A nervous wreck.' },
  { q: 'Im reading a book on the history of glue.', a: 'I just cant seem to put it down.' },
  { q: 'Dad, can you put the cat out?', a: 'I did not know it was on fire.' },
  { q: 'What did the ocean say to the sailboat?', a: 'Nothing, it just waved.' },
  { q: 'What do you get when you cross a snowman with a vampire?', a: 'Frostbite' },
  { q: 'Why are you adding another joke to the list?', a: 'So I can get the CircleCI checkmark' },
];

// limit must be a number, between 1 and the number of jokes, and must be an integer
const fixLimit = (limit = 1) => {
  let limitNum = Number(limit);
  limitNum = !limitNum ? 1 : limitNum;
  limitNum = limitNum < 1 ? 1 : limitNum;
  limitNum = limitNum > jokes.length ? jokes.length : limitNum;
  limitNum = Math.floor(limitNum);

  return limitNum;
};

// return in json format
const getRandomJokeJSON = (limit = 1) => {
  const limitFixed = fixLimit(limit);

  // npm install underscore
  const jokesShuffled = _.shuffle(jokes);
  const jokeArray = [{ q: '', a: '' }];

  for (let i = 0; i < limitFixed; i += 1) {
    jokeArray[i] = {
      q: jokesShuffled[i].q,
      a: jokesShuffled[i].a,
    };
  }

  return JSON.stringify(jokeArray);
};

// return in xml format
const getRandomJokeXML = (limit = 1) => {
  const limitFixed = fixLimit(limit);
  const jokesShuffled = _.shuffle(jokes);

  let responseXML = '<jokes>';

  for (let i = 0; i < limitFixed; i += 1) {
    const jokeXML = `
    <joke>
        <q>${jokesShuffled[i].q}</q>
        <a>${jokesShuffled[i].a}</a>
    </joke>
    `;
    responseXML = responseXML.concat(jokeXML);
  }

  responseXML = responseXML.concat('</jokes>');

  return responseXML;
};

// return xml if accepted, json otherwise
const getRandomJokeResponse = (request, response, params, acceptedTypes, httpMethod) => {
  // Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
  // Refactored to an arrow function by ACJ
  const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

  if (acceptedTypes.includes('text/xml')) {
    if (httpMethod === 'HEAD') {
      response.writeHead(206, {
        'Content-Type': 'text/xml',
        'Content-Length': getBinarySize(getRandomJokeXML(params.limit)),
      });
    } else {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(getRandomJokeXML(params.limit));
    }
  } else if (httpMethod === 'HEAD') {
    response.writeHead(206, {
      'Content-Type': 'application/json',
      'Content-Length': getBinarySize(getRandomJokeJSON(params.limit)),
    });
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(getRandomJokeJSON(params.limit));
  }

  response.end();
};

module.exports.getRandomJokeResponse = getRandomJokeResponse;
