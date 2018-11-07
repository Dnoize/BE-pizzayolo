const Mongoose = require("mongoose");
const Ingredient = require("./models/ingredient");
const Suggestion = require("./models/suggestion");
const Pizza = require("./models/pizza");
const User = require("./models/user");
var bodyparser = require("body-parser");

const Http = require("http");
const express = require("express");
const Router = express();
const cors = require("cors");

Mongoose.Promise = global.Promise;

Mongoose.connect("mongodb://test:test00@ds133353.mlab.com:33353/vanessabeghin", (error) => {
    console.log("Mongo is now connected ")
});

Router.use(cors())
Router.listen(3000)

Router.use(bodyparser.json());



Router.get('/ingredients', (req, res) => {
    Ingredient.find({}, {}, (error, ingredients) => {
        res.json(ingredients)
    })
})



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

//------------------------------------ GET SUGGESTIONS --------------------------------------------

Router.get("/suggestions", async (req, res) => {
    console.log(req.query);
    
    
    
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