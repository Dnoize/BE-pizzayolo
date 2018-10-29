const Mongoose = require("mongoose");
const Ingredient = require("./models/ingredient");
const Suggestion = require("./models/suggestion");
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

// .exec(function(err,pizza){
//     if (err) return handleError(err);
//     console.log(pizza[0]);
//    })

// Pizza.find({}, { _id: 0, name: 1, ingredients: 1, price: 1 }, (error, pizzas) => {

//     const return_pizzas = [];
//     pizzas.map(item => {
//         let ingredientsPizza = [];
//         let promises = []
//         item.ingredients.map(item2 => {
//             promises.push(Ingredient.find({ id_ing: item2 }))
//         })
//         Promise.all(promises).then(data => {
//             ingredientsPizza.push(data)
//             // console.log(ingredientsPizza)
//             item.ingredients = ingredientsPizza;
//             console.log(return_pizzas)

//         })

//     })

//     res.json(pizzas)

// });

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
