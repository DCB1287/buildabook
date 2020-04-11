const Router = require('express').Router();
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID
let Chapter = require('../models/chapter.model');
let User = require('../models/user.model');

// get all chapters
Router.route('/getAll').get((req, res) =>
{
    let query = Chapter.find({});
    query.exec((err, chapters) => {
        if(err) res.send(err);
        res.json(chapters);
    });
});


// Get a Chapters by ids
// can be multiple ids
Router.route('/getById').get((req, res) =>
{
    const targets = req.query.chapters;

    let query = Chapter.find ({_id: targets});
    query.exec((err, chapters) => {
        if(err) res.send(err);
        res.json(chapters);
    });
});

// Get Chapters by Author
Router.route('/getByAuthor').get((req, res) =>
{
    const targets = req.query.author;

    let query = Chapter.find ({author: targets} );
    query.exec((err, chapters) => {
        if(err) res.send(err);
        res.json(chapters);
    });
});



// Add a contender
    // Requires:
    // id of chapter
    // title of contender
    // text of contender
    // id of author of contender
Router.route('/addContender').post((req, res) =>
{
    const targetChapter = req.body.chapter;
    const title = req.body.title;
    const text = req.body.text;
    const author = req.body.author;
    const id1 = new ObjectID;

    // create the new contender
    const newContender = new Chapter({
        _id: id1,
        title,
        text,
        author,
        expirationDate: 0,
        startDate: 0,
        comments: [],
        upvoteCount: 1,
        dateCreated: Date.now(),
        contenders: []
    });

    let query = Chapter.updateOne(
        {_id: targetChapter},
        {$push: {contenders: id1.toHexString()} } 
        );
    
    query.exec((err, chapters) => {
        // do nothing
    });

    newContender.save().then(() => res.status(200).json({message: 'Contender added!'}))
    .catch(err => res.status(400).json('Error: ' + err));;
    
});


// Delete a contender and all evidence that it was there
Router.route('/delete').delete((req, res) =>
{
    const targetChapter = req.body.chapter;
    
    let query = Chapter.deleteOne({_id: targetChapter});
    
    query.exec();

    query = Chapter.updateOne(
        {contenders: targetChapter},
        {$pull: {contenders: targetChapter}}
        );
    
    query.exec((err, chapters) => {
        if(err) res.status(400).json('Error: ' + err)
    });

    res.status(200).json({message: 'Contender deleted!'});
    
});



// Edit text contents of the Chapter




module.exports = Router;