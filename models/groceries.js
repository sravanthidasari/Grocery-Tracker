const mongoose = require("mongoose");

const grocerySchema = new mongoose.Schema(
  {
    groceryItem: { type: String, required: true },
    itemPriority: String,
    restockQuantity: { type: Number, required: true },
    consumeQuantity: { type: Number, required: true }
  },
  {
    timestamps: true
  }
);

const grocery = mongoose.model("grocery", grocerySchema);
module.exports = grocery;
