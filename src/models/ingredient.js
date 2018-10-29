
const Mongoose = require("mongoose");
let Schema = Mongoose.Schema;

let schema = new Schema({
    _id : Schema.Types.ObjectId,
    name: String,
    type: String,
    price: Number,

});
module.exports = Mongoose.model("Ingredient", schema, "ingredients");