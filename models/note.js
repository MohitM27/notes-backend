const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define schema for a note
const NoteSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Note', NoteSchema);
