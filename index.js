const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();
const notesRouter = require('./routes');

const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS middleware
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/notes';
// Connect to MongoDB
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/notes', notesRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error for debugging purposes
    res.status(500).json({ message: 'Something went wrong!' }); // Send a generic error message to the client
});


app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
