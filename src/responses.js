const drinks = {};

const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const getDrinks = (request, response) => {
  const responseJSON = {
    drinks,
  };

  respondJSON(request, response, 200, responseJSON);
};

const getDrinksMeta = (request, response) => {
  respondJSONMeta(request, response, 200);
};

const addDrink = (request, response, body) => {
  const responseJSON = {
    message: 'all fields are required',
  };

  if (!body.name || !body.ingredients) {
    responseJSON.id = 'missingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  let responseCode = 201;

  if (drinks[body.name]) {
    responseCode = 204;
  } else {
    drinks[body.name] = {};
  }

  drinks[body.name].name = body.name;
  drinks[body.name].ingredients = body.ingredients;
  drinks[body.name].glass = body.glass;
  drinks[body.name].instructions = body.instructions;


  if (responseCode === 201) {
    responseJSON.message = 'Drink Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

const notReal = (request, response) => {
  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };

  respondJSON(request, response, 404, responseJSON);
};

const notRealMeta = (request, response) => {
  respondJSONMeta(request, response, 404);
};

module.exports = {
  getDrinks,
  getDrinksMeta,
  notReal,
  notRealMeta,
  addDrink,
};
