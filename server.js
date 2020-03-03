const express = require("express");
const mongoose = require("mongoose");
const app = express();
const methodOverride = require('method-override');
const db = mongoose.connection;
const PORT = 3000;


app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));

mongoose.connect('mongodb://localhost:27017/groceries', { useNewUrlParser: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

const groceryController = require('./controllers/grocery.js')
app.use('/groceries', groceryController)

app.listen(PORT);
