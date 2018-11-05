const Mongoose = require("mongoose");
let Schema = Mongoose.Schema;

let pizzaSchema = new Schema({
    _id : Schema.Types.ObjectId,
    name: String,
    ingredients: [
        { 
            type: Schema.Types.ObjectId, 
            ref: 'Ingredient'
        }
    ],
    price: Number
});

module.exports = Mongoose.model("Pizza", pizzaSchema,"pizzas");