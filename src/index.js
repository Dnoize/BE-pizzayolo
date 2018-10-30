const Mongoose = require("mongoose");
const Ingredient = require("./models/ingredient");
const Pizza = require("./models/pizza");

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

Router.get("/ingredients", (req, res) => {
  Ingredient.find({}, {}, (error, ingredients) => {
    res.json(ingredients);
  });
});

Router.get("/pizzas", async (req, res) => {
  let pizzas = await Pizza.find().populate("ingredients");
  let ingredients = await Ingredient.find();
  pizzas.forEach(pizza => {
     let pizzaIngredients = pizza.ingredients.map(item => getIngredientsById(ingredients,item._id))
    pizza.ingredients = pizzaIngredients;
  });
  res.json(pizzas);
});

function getIngredientsById(ingredientsArr, id) {
  return ingredientsArr.find(item => {
    return item.id == id;
  });
}