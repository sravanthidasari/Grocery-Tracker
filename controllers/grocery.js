const express = require('express');
const router = express.Router();
const Grocery = require('../models/groceries.js');


//new
router.get('/new', (req,res) => {
  res.render('groceries/new.ejs');
});

//index
router.get('/', (req,res) => {
  Grocery.find({},(err, allGroceries) => {
      res.render('groceries/index.ejs', {
          groceries: allGroceries
      });
  });
});

//create
router.post('/', (req,res) => {
  if(req.body.itemPriority >= 1){
      req.body.itemPriority = "normal";
  } else {
      req.body.itemPriority = "high";
  }

  Grocery.create(req.body, (err, newGroceryItem) => {
      res.redirect("/groceries");
  });
});

//show
router.get('/:groceryItem', (req,res) => {
  Grocery.findOne({groceryItem: req.params.groceryItem}, (err, allGroceries) => {
      res.render('groceries/show.ejs', {
          groceries: allGroceries
      });
  });
});

//Edit
router.get('/:groceryItem/edit', (req,res) => {
  Grocery.findOne({groceryItem: req.params.groceryItem}, (err,allGroceries) =>{
      res.render('groceries/edit.ejs', {
          groceries: allGroceries
      });
  });
}),

//Update
router.put('/:groceryItem', (req,res) => {
  const newItem = req.body;
  newItem. itemPriority = newItem. itemPriority >= 1? normal : high;
  Log.findOneAndUpdate({ groceryItem: req.params.groceryItem }, req.body, { new: true }, (err, data) => {
    res.render('groceries/show.ejs', {
      groceries: allGroceries
    });
});
});

//Delete
router.delete('/:groceryItem', (req, res) => {
  Log.findOneAndDelete({ groceryItem: req.params.groceryItem }, (err, data) => {
      res.redirect("/groceries");
  });
});

module.exports = router;
