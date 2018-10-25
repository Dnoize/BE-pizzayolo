const Mongoose = require("mongoose");
const Ingredient = require("./models/ingredient");
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
    Ingredient.find({}, { _id: 0, name: 1, price: 1, id_ing: 1 }, (error, ingredients) => {
        res.json(ingredients)
    })
})

Router.get('/pizzas', (req, res) => {
    Pizza.find({}, { _id: 0, name: 1, ingredients: 1, price: 1 }, (error, pizzas) => {
        const return_pizzas = [];
        pizzas.map(item => {
            let ingredientsPizza = [];
            let promises = []
            item.ingredients.map(item2 => {
                promises.push(Ingredient.find({ id_ing: item2 }))
            })
            Promise.all(promises).then(data => {
                ingredientsPizza.push(data)
                // console.log(ingredientsPizza)
                item.ingredients = ingredientsPizza;
                console.log(return_pizzas)

            })

        })

    })
})


