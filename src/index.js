const Mongoose = require("mongoose");
const Ingredient = require("./models/ingredient");
const Suggestion = require("./models/suggestion");
const Pizza = require("./models/pizza");
const User = require("./models/user");
var bodyparser = require("body-parser");
const _ = require('lodash');
const Http = require("http");
const express = require("express");
const Router = express();
const cors = require("cors");
<<<<<<< HEAD
const _ = require('lodash');

=======
>>>>>>> 7e07f836fa8ebde5feecee7c2215892a4526ffb4

Mongoose.Promise = global.Promise;
Mongoose.set("debug",true)

Mongoose.connect("mongodb://test:test00@ds133353.mlab.com:33353/vanessabeghin", (error) => {
    console.log("Mongo is now connected ")
});

Router.use(cors())
Router.listen(3000)

Router.use(bodyparser.json());






//-------------------------------------- LOGIN -----------------------------------------------



// User.findOne({"email":})

Router.post("/login", (req, res, user) => {
    let loggedIn = false;
    let admin = false;
    console.log("register")
    console.log(req.body.email)
    let authUser = User.find({ "email": req.body.email, "password": req.body.password }).then((result) => {
        if (result.length > 0) {
            loggedIn = true;
        }
        res.json(loggedIn)
    })

})


//-------------------------------------- REGISTER -----------------------------------------------



Router.post("/register", (req, res) => {
    var firstname = req.body.firstname;
    var email = req.body.email;
    var telephone = req.body.telephone;
    var password = req.body.password;
    console.log(req.body)
    var user = new User();
    user.firstname = firstname;
    user.email = email;
    user.telephone = telephone;
    user.password = password;
    console.log(user)
    user.save((err, result) => {
        if (err) {
            console.log("bug");
            res.json({ success: "Failed to add user", status: 500 });
        } else {
            res.json({ success: "Successfully added new user", status: 200 });
        }

    })
})


//-------------------------------------- GET PIZZAS -----------------------------------------------

Router.get("/pizzas", async (req, res) => {
    let pizzas = await Pizza.find().populate("ingredients");
    let ingredients = await Ingredient.find();
    pizzas.forEach(pizza => {
        let pizzaIngredients = pizza.ingredients.map(item => getIngredientsById(ingredients, item._id))
        pizza.ingredients = pizzaIngredients;
    });
    res.json(pizzas);
});

//----------------------------------- GET ID INGREDIENTS ----------------------------

// Router.get("/suggestions", async (req, res) => {
//     console.log(req.query);



//     let suggestions = await Suggestion.find().populate("ingredients");
//     let ingredients = await Ingredient.find();
//     suggestions.forEach(suggestion => {
//         let suggestionIngredients = suggestion.ingredients.map(item => getIngredientsById(ingredients,item._id))
//         suggestion.ingredients = suggestionIngredients;
//     });

//   res.json(suggestions);
// });


//----------------------- GET ID INGREDIENTS FOR PIZZAS & SUGGESTIONS ----------------------------
Router.get('/ingredients', (req, res) => {
    Ingredient.find({}, {}, (error, ingredients) => {
        res.json(ingredients)
    })
})

function getIngredientsById(ingredientsArr, id) {
    return ingredientsArr.find(item => {
        return item.id == id;
    });
}

//------------------------------------ GET SUGGESTIONS --------------------------------------------

Router.get("/suggestions", async (req, res) => {
    let queryIngredients = req.query.ingredients
    let idOfIngredient = []
    if(queryIngredients !== undefined){
        queryIngredients.forEach(item => {
            idOfIngredient.push(Mongoose.Types.ObjectId(item))
        })
    }


    let suggestions = await Suggestion.find({ "ingredients._id": { $all: idOfIngredient } }).populate("ingredients");

    let ingredients = await Ingredient.find();
    let filtered_ingredients = []
    suggestions.forEach(suggestion => {
        suggestion.ingredients.forEach(item => filtered_ingredients.push(getIngredientsById(ingredients, item._id)));
           });

   filtered_ingredients_cleaned = _.uniqWith(filtered_ingredients, _.isEqual);
    res.json(filtered_ingredients_cleaned);
});
