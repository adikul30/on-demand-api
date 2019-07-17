const ObjectId = require('mongodb').ObjectID;

// Get name of model. Get it later from the user
let modelName = 'Note'.toLowerCase()
let plural = 's'
let col = modelName.concat(plural)

// Create and Save a new Note
exports.create = (req, res) => {

    const db = req.app.locals.db;

    let doc = req.body

    db.collection(col).insertOne(doc)
    .then(function(result) {
        console.log(result)
        res.send(result);
    })
    .catch(err => {
        console.log(err.message)
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Note."
        });
    });

};

// Retrieve and return all notes from the database.
exports.findAll = (req, res) => {

    const db = req.app.locals.db;

    db.collection(col).find({}).toArray()
    .then(docs => {
        console.log("findAll")
        console.log(docs)
        res.send(docs);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });

};

// Find a single note with a someId
exports.findOne = (req, res) => {

    const db = req.app.locals.db;

    db.collection(col).findOne({ "_id" : ObjectId(req.params.someId) }, function(err, doc) {
        console.log(err)
        console.log("findOne")
        console.log(doc)
        res.send(doc);
    });

};

// Update a note identified by the someId in the request
exports.update = (req, res) => {

    let doc = req.body
    console.log("update")

    const db = req.app.locals.db;
    db.collection(col).replaceOne(
        { _id: ObjectId(req.params.someId) },
        { doc })
    .then(function(result){
        res.send(result);
    })

};

// Delete a note with the specified someId in the request
exports.delete = (req, res) => {

    console.log("delete")

    const db = req.app.locals.db;
    db.collection(col).deleteOne({ _id: ObjectId(req.params.someId) })
    .then(function(result){
        res.send(result);
    })

};