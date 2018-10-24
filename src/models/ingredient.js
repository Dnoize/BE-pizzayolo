// our example model is just an Array
// const facets = [];
// export default facets;

const Mongoose = require("mongoose");
let Schema = Mongoose.Schema;

let schema = new Schema({
    name: String,
    type: String,
    price: Number,
});
module.exports = Mongoose.model("Ingredient", schema);