const fs = require('fs');

const errorPage = fs.readFileSync(`${__dirname}/../client/error.html`);
const aquaStyle = fs.readFileSync(`${__dirname}/../client/default-styles.css`);

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

module.exports.get404Response = get404Response;
module.exports.getCSSResponse = getCSSResponse;
