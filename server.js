const express = require("express");
const mongoose = require("mongoose");
const app = express();
const methodOverride = require('method-override');
const db = mongoose.connection;
const PORT = 3000;


app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));

mongoose.connect('mongodb://localhost:27017/basiccrud', { useNewUrlParser: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

//new
app.get('/groceries/new', (req,res) => {
    res.send('groceries/new.ejs');
});

//index
app.get('/groceries', (req,res) => {
    Grocery.find({},(err, allGroceries) => {
        res.render('groceries/index.ejs', {
            groceries: allGroceries
        });
    });
});

//create
app.post('/', (req,res) => {
    if(req.body. itemPriority >= 1){
        req.body.itemPriority = normal;
    } else {
        req.body.itemPriority = high;
    }
    Grocery.create(req.body, (err,newGroceryItem) => {
        res.send(newGroceryItem);
    });
});

//show
app.get('/:groceryItem', (req,res) => {
    Grocery.findOne({groceryItem: req.params.groceryItem}, (err,allGroceries) =>{
        res.render('groceries/show.ejs', {
            groceries: allGroceries
        });
    });
});

//Edit
app.get('/:groceryItem/edit', (req,res) => {
    Grocery.findOne({groceryItem: req.params.groceryItem}, (err,allGroceries) =>{
        res.render('groceries/edit.ejs', {
            groceries: allGroceries
        });
    });
}),

//Update
app.put('/', (req,res) => {
    if(req.body. itemPriority >= 1){
        req.body.itemPriority = normal;
    } else {
        req.body.itemPriority = high;
    }
    Grocery.create(req.body, (err,newGroceryItem) => {
        res.send(newGroceryItem);
    });
});


app.listen(PORT);
