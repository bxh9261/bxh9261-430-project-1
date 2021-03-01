// using underscore.js
// https://underscorejs.org/
const _ = require('underscore');

const characters = [
  { media: 'Spongebob', char: 'Spongebob', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/3b/SpongeBob_SquarePants_character.svg/1200px-SpongeBob_SquarePants_character.svg.png' },
  { media: 'Spongebob', char: 'Patrick', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/3/33/Patrick_Star.svg/1200px-Patrick_Star.svg.png' },
  { media: 'Spongebob', char: 'Squidward', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Squidward_Tentacles.svg/1200px-Squidward_Tentacles.svg.png' },
  { media: 'Spongebob', char: 'Mr. Krabs', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f8/Mr._Krabs.svg/1200px-Mr._Krabs.svg.png' },
  { media: 'Spongebob', char: 'Pearl', img: 'https://static.wikia.nocookie.net/spongebob/images/e/ef/SpongeBob_SquarePants_-_Pearl_Krabs_promo_art.png' },
  { media: 'Spongebob', char: 'Plankton', img: 'https://static.wikia.nocookie.net/spongebob/images/7/77/Plankton_stock_art.png' },
  { media: 'Spongebob', char: 'Gary', img: 'https://static.wikia.nocookie.net/nickelodeon/images/7/76/Gary_in_2018.png' },
  { media: 'Spongebob', char: 'Sandy', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a0/Sandy_Cheeks.svg/1200px-Sandy_Cheeks.svg.png' },
  { media: 'Spongebob', char: 'Mrs. Puff', img: 'https://upload.wikimedia.org/wikipedia/en/thumb/c/ce/Mrs._Puff.svg/1200px-Mrs._Puff.svg.png' },
    
  { media: 'CelesteQuest', char: 'Mabel', img: 'https://i.imgur.com/6xohxbl.png' },
  { media: 'CelesteQuest', char: 'Angela', img: 'https://i.imgur.com/XoFarO5.png' },
  { media: 'CelesteQuest', char: 'Zozo', img: 'https://i.imgur.com/Vk4Ermn.png' },
  { media: 'CelesteQuest', char: 'Rhys', img: 'https://i.imgur.com/5Y05eIo.png' },
  { media: 'CelesteQuest', char: 'Shaheen', img: 'https://i.imgur.com/T8C4UY4.png' },
  { media: 'CelesteQuest', char: 'Lago', img: 'https://i.imgur.com/oeUVDKV.png' },
  { media: 'CelesteQuest', char: 'Jakei', img: 'https://i.imgur.com/2nuRwuB.png' },
  { media: 'CelesteQuest', char: 'Kyle', img: 'https://i.imgur.com/hy8B2LX.png' },
  { media: 'CelesteQuest', char: 'William', img: 'https://i.imgur.com/h5Ecxzr.jpg' }
];

const checkSet = (set = 'All') => {
   for(let i = 0; i < characters.length; i+=1){
       if(characters[i].media.toLowerCase() === set.toLowerCase()){
           return set;
       }
   }
   return 'All';
};

// return in json format
const getCharactersJSON = (set = 'All') => {
  const setFixed = checkSet(set);

  const charArray = [{ media: '', char: '', img: '' }];
  let arrayPos = 0;

  for (let i = 0; i < characters.length; i+=1){
      if(characters[i].media.toLowerCase() === setFixed.toLowerCase() || setFixed === 'All'){
        charArray[arrayPos] = {
            media: characters[i].media,
            char: characters[i].char,
            img: characters[i].img
        };
        arrayPos+=1;
      }

  }

  return JSON.stringify(charArray);
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
const getCharacterResponse = (request, response, params, acceptedTypes, httpMethod) => {
  // Source: https://stackoverflow.com/questions/2219526/how-many-bytes-in-a-javascript-string/29955838
  // Refactored to an arrow function by ACJ
  const getBinarySize = (string) => Buffer.byteLength(string, 'utf8');

  if (acceptedTypes.includes('text/xml')) {
    if (httpMethod === 'HEAD') {
      response.writeHead(206, {
        'Content-Type': 'text/xml',
        'Content-Length': getBinarySize(getRandomJokeXML(params.set)),
      });
    } else {
      response.writeHead(200, { 'Content-Type': 'text/xml' });
      response.write(getRandomJokeXML(params.limit));
    }
  } else if (httpMethod === 'HEAD') {
    response.writeHead(206, {
      'Content-Type': 'application/json',
      'Content-Length': getBinarySize(getCharactersJSON(params.set)),
    });
  } else {
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(getCharactersJSON(params.set));
  }

  response.end();
};

module.exports.getCharacterResponse = getCharacterResponse;
