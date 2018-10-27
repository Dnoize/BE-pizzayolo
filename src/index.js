const Mongoose = require("mongoose");
const Ingredient = require("./models/ingredient");
const Suggestion = require("./models/suggestion");
const Pizza = require("./models/pizza");
const User = require("./models/user");
var bodyparser = require("body-parser");

const Http = require("http");
const express = require("express")
const Router = express();
const cors = require('cors');

Mongoose.Promise = global.Promise;

// ------------ Connexion

Mongoose.connect("mongodb://test:test00@ds133353.mlab.com:33353/vanessabeghin", (error) => {
    console.log("Mongo is now connected ")
});
Router.use(cors())
Router.listen(3000)

Router.use(bodyparser.json());
Router.get('/ingredients', (req, res) => {
    Ingredient.find({}, { _id: 0, name: 1, price: 1, id_ing: 1 }, (error, ingredients) => {
        res.json(ingredients)
    })
})


Router.post("/register", (req, res) => {
    var firstname = req.body.firstname;
    var email = req.body.firstname;
    var telephone = req.body.firstname;
    var password = req.body.password;

    var user = new User();
    user.firstname = firstname;
    user.email = email;
    user.telephone = telephone;
    user.password = password;

    user.save((err, result) => {
        if (err) {
            console.log("bug");
            res.json({ success: "Failed to add user", status: 500 });
        } else {
            res.json({ success: "Successfully added new user", status: 200 });
        }

    })
})




Router.get('/pizzas', (req, res) => {
    Pizza.find({}, { _id: 0, name: 1, ingredients: 1, price: 1 }, (error, pizzas) => {

        // const return_pizzas = [];
        // pizzas.map(item => {
        //     let ingredientsPizza = [];
        //     let promises = []
        //     item.ingredients.map(item2 => {
        //         promises.push(Ingredient.find({ id_ing: item2 }))
        //     })
        //     Promise.all(promises).then(data => {
        //         ingredientsPizza.push(data)
        //         // console.log(ingredientsPizza)
        //         item.ingredients = ingredientsPizza;
        //         console.log(return_pizzas)

        //     })

        // })

        console.log("rien")
        res.json(pizzas)

    })
})

// Router.get('/suggestions', (req, res) => {
//     Suggestion.find({}, { _id: 0, name: 1, ingredients: 1 }, (error, suggestions) => {

//         suggestions.forEach(element => {
//             console.log(element);
//             let query = [];
//             console.log(element.name)
//             console.log(element.ingredients);
//             element.ingredients.forEach(elementdeux => {
//                 query.push({ 'id.ing': elementdeux });
//                 console.log(query);
//             });
//             query = { $or: query }
//             Ingredient.find(query, { _id: 0, name: 1 }, (error, IngSug) => {
//                 console.log(IngSug);
//                 suggestions["IngredientName"] = IngSug;

//             })

//         });

//         res.json(suggestions)

//     })
// })


