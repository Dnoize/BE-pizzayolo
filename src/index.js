// import http from 'http';
// import express from 'express';
// import cors from 'cors';
// import morgan from 'morgan';
// import bodyParser from 'body-parser';
// import initializeDb from './db';
// import middleware from './middleware';
// import api from './api';
// import config from './config.json';

// let app = express();
// app.server = http.createServer(app);

// // logger
// app.use(morgan('dev'));

// // 3rd party middleware
// app.use(cors({
// 	exposedHeaders: config.corsHeaders
// }));

// app.use(bodyParser.json({
// 	limit : config.bodyLimit
// }));

// // connect to db
// initializeDb( db => {

// 	// internal middleware
// 	app.use(middleware({ config, db }));

// 	// api router
// 	app.use('/api', api({ config, db }));

// 	app.server.listen(process.env.PORT || config.port, () => {
// 		console.log(`Started on port ${app.server.address().port}`);
// 	});
// });

// export default app;


const Mongoose = require("mongoose");
const Ingredient = require("./models/ingredient");
const Http = require("http");
const express = require("express")
const Router = express();
const cors = require('cors');

Mongoose.Promise = global.Promise;



  
// ------------ Connexion

Mongoose.connect("mongodb://test:test00@ds133353.mlab.com:33353/vanessabeghin", (error) => {
    console.log("Mongo is now connected ")
});
Router.listen(3000)

Router.use(cors())

Router.get('/ingredients', (req,res)=>{
    console.log("Test");
    Ingredient.find({},{_id : 0, name:1}, (error, ingredients) => {
        res.json({data: ingredients})
    })
        //   .then((error, ingredients) => {
        //       if (!ingredients) {return res.sendStatus(404)}
        //       console.log(ingredients);
        //       return res.json({ingredients}).statusCode(200)
           
        // })
})




// Http.createServer(Router).listen(8080, (err) => {
//     if (err) console.log(err);
//     console.log("Server is running on port 8080")
// });