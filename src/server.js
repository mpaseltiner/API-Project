const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses.js');
const responseHandler = require('./responses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;


const handlePost = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/addDrink') {
    const res = response;
    const body = [];

    request.on('error', (err) => {
      console.dir(err);
      res.statusCode = 400;
      res.end();
    });

    request.on('data', (chunk) => {
      body.push(chunk);
    });

    request.on('end', () => {
      const bodyString = Buffer.concat(body).toString();
      const bodyParams = query.parse(bodyString);

      responseHandler.addDrink(request, res, bodyParams);
    });
  }
};

const handleGet = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/') {
    htmlHandler.getIndex(request, response);
  } else if (parsedUrl.pathname === '/style.css') {
    htmlHandler.getCSS(request, response);
  } else if (parsedUrl.pathname === '/getDrinks') {
    responseHandler.getDrinks(request, response);
  } else if (parsedUrl.pathname === '/notReal') {
    responseHandler.notReal(request, response);
  } else {
    responseHandler.notReal(request, response);
  }
};

const handleMeta = (request, response, parsedUrl) => {
  if (parsedUrl.pathname === '/getDrinks') {
    responseHandler.getDrinksMeta(request, response);
  } else {
    responseHandler.notRealMeta(request, response);
  }
};

const onRequest = (request, response) => {
  console.log(request.url);
  const parsedURL = url.parse(request.url);

  switch (request.method) {
    case 'POST':
      handlePost(request, response, parsedURL);
      break;
    case 'GET':
      handleGet(request, response, parsedURL);
      break;
    case 'HEAD':
      handleMeta(request, response, parsedURL);
      break;
    default:
      responseHandler.notReal(request, response);
  }
};


http.createServer(onRequest).listen(port);

console.log(`Listening on 127.0.0.1: ${port}`);
