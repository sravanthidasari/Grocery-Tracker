const mongoose = require('mongoose');

const grocerySchema = new mongoose.Schema({
    groceryItem: {type:String, required:true},
    itemPriority: {type:String, priority: low || high },
    quantity: {type: Number, required: true}
})


const Quantity = mongoose.model('grocery', grocerySchema);

module.exports = Quantity;
