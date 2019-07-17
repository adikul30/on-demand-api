module.exports = (app) => {
    const notes = require('../controllers/note.controller.js');

    // Create a new Note
    app.post('/someroute', notes.create);

    // Retrieve all Notes
    app.get('/someroute', notes.findAll);

    // Retrieve a single Note with someId
    app.get('/someroute/:someId', notes.findOne);

    // Update a Note with someId
    app.post('/someroute/:someId', notes.update);

    // Delete a Note with someId
    app.delete('/someroute/:someId', notes.delete);
}