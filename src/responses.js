const drinks = {
  'The Lemon': {
    name: 'The Lemon',
    image: 'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/lemon-health-benefits-1296x728-feature.jpg?w=1155',
    ingredients: 'tons of lemons and ice',
    glass: 'Rocks',
    instructions: 'squeeze the lemons into the rocks glass add ice and stir until chilled',
  },
  'The Manhattan': {
    name: "The Manhattan",
    image: "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2013/2/13/0/ED0309H_classic-manhattan-cocktail_s4x3.jpg.rend.hgtvcom.826.620.suffix/1371614573383.jpeg",
    ingredients: "Ice\n2 oz rye whiskey\n1/2 oz sweet vermouth\n1 dash Angostura bitters\n1 maraschino cherry",
    glass: "Rocks",
    instructions: "Combine whiskey, vermouth, and bitters in a cocktail mixing glass. Add ice and stir until chilled. Strain into a chilled rocks glass. Garnish with the maraschino cherry",
  },
};

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
  drinks[body.name].image = body.image;
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
