const Mongoose = require("mongoose");
let Schema = Mongoose.Schema;

let schema = new Schema({
    _id : Schema.Types.ObjectId,
    name: String,
    ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
});

module.exports = Mongoose.model("Suggestion", schema);