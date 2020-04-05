const Router = require('express').Router();

let Chapter = require('../models/chapter.model');

// get all chapters
Router.route('/getAll').get((req, res) =>
{
    let query = Chapter.find({});
    query.exec((err, chapters) => {
        if(err) res.send(err);
        res.json(chapters);
    });
});
// Create a Chapter

// Edit text contents of the Chapter

// Delete a Chapter?

// Get a Chapter

// Get Chapter based on array of _id



module.exports = Router;