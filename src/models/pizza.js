const Mongoose = require("mongoose");
let Schema = Mongoose.Schema;

let schema = new Schema({
    name: String,
    ingredients: Array,
    price: Number,
});
module.exports = Mongoose.model("Pizza", schema);