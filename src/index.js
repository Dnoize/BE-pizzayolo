const Mongoose = require("mongoose");
const Ingredient = require("./models/ingredient");
const Suggestion = require("./models/suggestion")
const Pizza = require("./models/pizza");

const Http = require("http");
const express = require("express")
const Router = express();
const cors = require('cors');

Mongoose.Promise = global.Promise;

// ------------ Connexion

Mongoose.connect("mongodb://test:test00@ds133353.mlab.com:33353/vanessabeghin", (error) => {
    console.log("Mongo is now connected ")
});
Router.listen(3000)

Router.use(cors())

Router.get('/ingredients', (req, res) => {
    Ingredient.find({}, { _id: 0, name: 1, price: 1 }, (error, ingredients) => {
        res.json(ingredients)
    })
})

Router.get('/pizzas', (req, res) => {
    Pizza.find({}, { _id: 0, name: 1, ingredients: 1, price: 1 }, (error, pizzas) => {
        res.json(pizzas)
    })
})

Router.get('/suggestions', (req, res) => {
    Suggestion.find({}, { _id: 0, name: 1, ingredients: 1 }, (error, suggestions) => {

        suggestions.forEach(element => {
            console.log(element);
            let query = [];
            console.log(element.name)
            console.log(element.ingredients);
            element.ingredients.forEach(elementdeux => {
                query.push({ 'id.ing': elementdeux });
                console.log(query);
            });
            query = { $or: query }
            Ingredient.find(query, { _id: 0, name: 1 }, (error, IngSug) => {
                console.log(IngSug);
                suggestions["IngredientName"] = IngSug;

            })

        });

        res.json(suggestions)

    })
})


