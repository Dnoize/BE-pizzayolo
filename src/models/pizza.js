const Mongoose = require("mongoose");
let Schema = Mongoose.Schema;

let schema = new Schema({
    name: String,
    ingredient: [Number],
    price: Number,
});
module.exports = Mongoose.model("Pizza", schema);