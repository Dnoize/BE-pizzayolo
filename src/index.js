const Mongoose = require("mongoose");
const Ingredient = require("./models/ingredient");
const Pizza = require("./models/pizza");
const Suggestion = require("./models/suggestion")

const Http = require("http");
const express = require("express");
const Router = express();
const cors = require("cors");

Mongoose.Promise = global.Promise;

Mongoose.connect(
  "mongodb://test:test00@ds133353.mlab.com:33353/vanessabeghin",
  error => {
    console.log("Mongo is now connected ");
  }
);
Router.listen(3000);

Router.use(cors());

//------------------------------------ GET INGREDIENTS -------------------------------------------

Router.get("/ingredients", (req, res) => {
  Ingredient.find({}, {}, (error, ingredients) => {
    res.json(ingredients);
  });
});

//-------------------------------------- GET PIZZAS -----------------------------------------------

Router.get("/pizzas", async (req, res) => {
  let pizzas = await Pizza.find().populate("ingredients");
  let ingredients = await Ingredient.find();
  pizzas.forEach(pizza => {
     let pizzaIngredients = pizza.ingredients.map(item => getIngredientsById(ingredients,item._id))
    pizza.ingredients = pizzaIngredients;
  });
  res.json(pizzas);
});

//------------------------------------ GET SUGGESTIONS --------------------------------------------

Router.get("/suggestions", async (req, res) => {
  let suggestions = await Suggestion.find().populate("ingredients");
  let ingredients = await Ingredient.find();
  suggestions.forEach(suggestion => {
     let suggestionIngredients = suggestion.ingredients.map(item => getIngredientsById(ingredients,item._id))
    suggestion.ingredients = suggestionIngredients;
  });
  res.json(suggestions);
});


//----------------------- GET ID INGREDIENTS FOR PIZZAS & SUGGESTIONS ----------------------------

function getIngredientsById(ingredientsArr, id) {
  return ingredientsArr.find(item => {
    return item.id == id;
  });
}