const mongoose = require('mongoose')
const Schema = mongoose.Schema

const itemSchema = new Schema({
    name: String,
    status: Boolean,
    quantity: Number,
    recommended: Number,
    category: String,
    tags: Array,
    unitCost: Number
})

const Item = mongoose.model('Item', itemSchema)
module.exports = Item;
