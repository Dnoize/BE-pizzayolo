export default callback => {
	// connect to a database if needed, then pass it to `callback`:
	callback();
}


//------------------------------------------------------------
// let pizzas = await Pizza
// .find();

// let ingredients = await Ingredient.find()
// .populate('ingredients');

// //console.log(pizzas);
// //console.log(ingredients[n].name);

// pizzas.forEach( (pizza, i) => {

// pizza.ingredients.forEach( (ingredient, j) => {

// 	console.log('INGREDIENT');
// 	console.log(ingredient);

// 	if(ingr._id === ingredient._id)
// 	{

// 		console.log('ingredients match --------------------------------');
// 		return ingr;
// 	}

// });

// });


//-----------------------------------------------------------------
// Router.get('/pizzas', (req, res) => {
//     Pizza.find({})
//          .populate('ingredients')
//          .exec(function(err,pizza){
//              if (err) return handleError(err);
//              console.log(pizza);
//              res.json(pizza)
//             })
//})
