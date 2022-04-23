const mongoose = require('mongoose')
const Schema = mongoose.Schema

const noteSchema = new Schema({
    message: String,
    editing: Boolean,

},{timestamps: true})

const Note = mongoose.model('Note', noteSchema)
module.exports = Note;
