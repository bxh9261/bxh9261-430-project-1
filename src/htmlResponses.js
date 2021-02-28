const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const aquaStyle = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const jokePage = fs.readFileSync(`${__dirname}/../client/joke-client.html`);

const get404Response = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(errorPage);
  response.end();
};

const getCSSResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(aquaStyle);
  response.end();
};

const getJokeClientResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(jokePage);
  response.end();
};

module.exports.get404Response = get404Response;
module.exports.getCSSResponse = getCSSResponse;
module.exports.getJokeClientResponse = getJokeClientResponse;
