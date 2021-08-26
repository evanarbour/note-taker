const express = require('express');
const path = require('path');

const api = require('./routes/router');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use('/api', api);

// GET Route for notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET Route for landing page
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);