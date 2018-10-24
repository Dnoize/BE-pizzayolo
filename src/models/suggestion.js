const Mongoose = require("mongoose");
let Schema = Mongoose.Schema;

let schema = new Schema({
    name: String,
    ingredient: [Number],
});

module.exports = Mongoose.model("Suggestion", schema);