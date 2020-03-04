const express = require("express");
const router = express.Router();
const Grocery = require("../models/groceries.js");

// new
router.get("/new", (req, res) => {
  res.render("groceries/new.ejs");
});

// index
router.get("/", (req, res) => {
  Grocery.find({}, (err, allGroceries) => {
    res.render("groceries/index.ejs", {
      groceries: allGroceries
    });
  });
});

// create
router.post("/", (req, res) => {
  const newItem = req.body;
  newItem.itemPriority = "high";
  newItem.totalQuantity = 0;

  Grocery.create(newItem, (err, newGroceryItem) => {
    res.redirect("/groceries");
  });
});

// show
router.get("/:groceryItem", (req, res) => {
  Grocery.findOne({ groceryItem: req.params.groceryItem }, (err, allGroceries) => {
    res.render("groceries/show.ejs", {
      groceries: allGroceries
    });
  });
});

// edit
router.get("/:groceryItem/edit", (req, res) => {
  Grocery.findOne({ groceryItem: req.params.groceryItem }, (err, allGroceries) => {
    res.render("groceries/edit.ejs", {
      groceries: allGroceries
    });
  });
});

// update
router.put("/:groceryItem", (req, res) => {
  Grocery.findOne({ groceryItem: req.params.groceryItem }, (err, data) => {
    const newItem = data;

    if (req.body.restock !== undefined) {
      newItem.totalQuantity += newItem.restockQuantity;
    } else if (req.body.consume !== undefined) {
      newItem.totalQuantity -= newItem.consumeQuantity;
      if (newItem.totalQuantity < 0) {
        newItem.totalQuantity = 0;
      }
    } else {
      newItem.restockQuantity = parseInt(req.body.restockQuantity, 10) || 1;
      newItem.consumeQuantity = parseInt(req.body.consumeQuantity, 10) || 1;
      newItem.totalQuantity = parseInt(req.body.totalQuantity, 10);
    }

    if (newItem.totalQuantity <= newItem.consumeQuantity) {
      newItem.itemPriority = "high";
    } else {
      newItem.itemPriority = "normal";
    }

    Grocery.findOneAndUpdate({ groceryItem: req.params.groceryItem }, newItem, { new: true }, (err, updatedItem) => {
      res.render("groceries/show.ejs", {
        groceries: updatedItem
      });
    });
  });
});

// delete
router.delete("/:groceryItem", (req, res) => {
  Grocery.findOneAndDelete({ groceryItem: req.params.groceryItem }, (err, allGroceries) => {
    res.redirect("/groceries");
  });
});

module.exports = router;
