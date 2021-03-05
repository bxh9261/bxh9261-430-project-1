const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const aquaStyle = fs.readFileSync(`${__dirname}/../client/default-styles.css`);
const mainPage = fs.readFileSync(`${__dirname}/../client/main-app.html`);
const mainPageJS = fs.readFileSync(`${__dirname}/main-app.js`);
const suggestPage = fs.readFileSync(`${__dirname}/../client/suggest-page.html`);

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

const getMainAppResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(mainPage);
  response.end();
};

const getMainAppJSResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(mainPageJS);
  response.end();
};

const getSuggestResponse = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(suggestPage);
  response.end();
};

module.exports.get404Response = get404Response;
module.exports.getCSSResponse = getCSSResponse;
module.exports.getMainAppResponse = getMainAppResponse;
module.exports.getMainAppJSResponse = getMainAppJSResponse;
module.exports.getSuggestResponse = getSuggestResponse;
