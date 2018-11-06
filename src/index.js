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
    Ingredient.find({}, { _id: 0, name: 1, price: 1, id_ing: 1 }, (error, ingredients) => {
        res.json(ingredients)
    })
})






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
    /* let authUser = User.find(item => item.email === user.email && item.password === user.password)
    if (User.find(item => item.email === user.email && item.password === user.password)) {
        loggedIn = true;
    
        if (authUser.role === "admin") {
            admin = true;
        }
        return true
    } else {
        return false
    } */
    // res.json(user);

})





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