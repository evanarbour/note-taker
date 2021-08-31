const fs = require('fs');
const util = require('util');

// uuid module to create unique ID for each note
const { v4: uuidv4 } = require('uuid');
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile)

// read the db.json file
function read() {
    return readFileAsync('db/db.json', 'utf8');
}

// function to retrieve notes from database then parse them
const getNotes = function() {
    return read().then((notes) => {
        let parsedNotes = JSON.parse(notes) || [];
        return parsedNotes;
    });
}

// function to take data from data base and write to a string
function write(note) {
    return writeFileAsync('db/db.json', JSON.stringify(note));
}

// function using the .filter method to remove a selected note
function deleteNote(id) {
    return getNotes().then((notes) => notes.filter((note) => note.id !== id))
    .then((filteredNotes) => write(filteredNotes));
}


module.exports = (app) => {
    app.get('/api/notes', (req, res) => {
        console.log('\n Working on GET request..');
    
        // read the db.json file
        let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    
        console.log('\n Notes data here: \n' + JSON.stringify(data));
    
        // return the data 
        res.json(data);
    });
    
    // POST route for note data
    app.post('/api/notes', (req, res) => {
    
        // set request body for data to be added
        const newNote = req.body;
    
        console.log('\n POST request for New Note: ' + JSON.stringify(newNote));
    
        // assign unique id to the note being created 
        newNote.id = uuidv4();
        
        // read the db.json file
        let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    
        // push the 'currentNote' into existing db.json file
        data.push(newNote);
    
        // update the db.json database with new data including 'currentNote'
        fs.writeFileSync('./db/db.json', JSON.stringify(data))
    
        console.log('\n Note added to database!');
    
        res.json(data);
    
    });

    app.delete('/api/notes/:id', (req, res) => {
        // find note ID of to-be-deleted note 
        const noteId = req.params.id.toString();
        console.log(noteId);

        // delete the note with the selected id
        deleteNote(noteId)

        .then(() => res.json({ok: true }))
        .catch((err) => res.status(500)).json(err);
 
    });
}



