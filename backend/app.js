const express = require('express');
const app=express();
const bodyParser=require('body-parser')
const morgan=require('morgan')
const mongoose=require('mongoose');
const cors=require('cors')

//Models
const Product=require('./models/product')
const Category=require('./models/category');

//helps to access the .env variables
require('dotenv/config');

//CONSTANTS
const api=process.env.API_URL;

//middleware
app.use(cors());//cors allows for frontend stuff to access data on the server
app.options('*',cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));

//Routes
const productsRouter=require('./routers/products')
const categoriesRouter=require('./routers/categories')


app.use(`${api}/products`,productsRouter);
app.use(`${api}/categories`,categoriesRouter);

//Connceting to MongoDB server
mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("database connection is ready....");
}).catch((err)=>{
    console.log(err);
})
;

//Starting the server
app.listen(process.env.PORT||3000,()=>{
    console.log('Server Running at port 3000');
});