const fs = require('fs');

// uuid module to create unique ID for each note
const { v4: uuidv4 } = require('uuid');


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
}



