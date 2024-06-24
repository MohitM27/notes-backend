const express = require('express');
const router = express.Router();
const Note = require('./models/note');

// GET all notes
router.get('/', async (req, res, next) => {
    try {
        const notes = await Note.find().sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (err) {
        console.error('Error fetching notes:', err);
        next(err);
    }
});

// GET single note by ID
router.get('/:id', async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (err) {
        console.error('Error fetching note:', err);
        next(err);
    }
});

// POST a new note
router.post('/', async (req, res, next) => {
    const { title, content } = req.body;
    // Validate input
    if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
    }
    try {
        // Save new note to database
        const newNote = await Note.create({ title, content });
        res.status(201).json(newNote);
    } catch (err) {
        console.error('Error creating note:', err);
        next(err);
    }
});

// PUT update a note
router.put('/:id', async (req, res, next) => {
    const { title, content } = req.body;
    try {
        // Update note in database
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(updatedNote);
    } catch (err) {
        console.error('Error updating note:', err);
        next(err);
    }
});

// DELETE a note
router.delete('/:id', async (req, res, next) => {
    try {
        // Delete note from database
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (err) {
        console.error('Error deleting note:', err);
        next(err);
    }
});

module.exports = router;
