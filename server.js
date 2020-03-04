const express = require("express");
const methodOverride = require('method-override');
const mongoose = require("mongoose");
const app = express();
const db = mongoose.connection;

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/groceries';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

db.on('error', (err) => console.log(err.message));
db.on('connected', () => console.log(`mongo connected at: ${MONGODB_URI}`));
db.on('disconnected', () => console.log('mongo disconnected'));

// Open the connection to mongo
db.on('open', () => {});

app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));

const groceryController = require('./controllers/grocery.js')
app.use('/groceries', groceryController)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
