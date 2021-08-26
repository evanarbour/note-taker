const express = require('express');

// import a modular router for /notes
const noteRouter = require('./notes');

const app = express();

// connects to /notes
app.use('/notes', noteRouter);

module.exports = app;