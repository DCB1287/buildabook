const Router = require('express').Router();
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID
let Chapter = require('../models/chapter.model');
let User = require('../models/user.model');

// Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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
    const targetChapter = req.body.chapterId;
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

// given a chapter/contender, upvote it

// requires chapter id
// requires user id
// returns the new upvote count
// does not check to see if person already upvoted 
Router.route('/upvoteInc').post((req, res, next) => 
{
    const userTarget = req.body.userId;
    const chapterTarget = req.body.chapterId;
    var upvotes = 0;

    let query = Chapter.findOne({"_id": chapterTarget});    
    query.exec((err, chapter) => 
    {   
        if (chapter === null)
        return res.status(404).json({error: "chapter not found"});

        upvotes = chapter.upvoteCount + 1;
        var query2 = Chapter.updateOne({"_id": chapter.id}, {upvoteCount: upvotes.toString()});
        query2.exec((err, chapters) => {
            
        });

        var query3 = User.updateOne({"_id": userTarget}, {$push: {upvotes: chapter.id}}) 
        query3.exec((err, user) => {
            
        });

        res.status(200).json({upvotes: upvotes});
    });
});

// given a chapter/contender, undo upvote

// requires chapter id
// requires user id
// returns the new upvote count
// does not check to see if person didn't upvote 
Router.route('/upvoteDec').post((req, res) => 
{
    const userTarget = req.body.userId;
    const chapterTarget = req.body.chapterId;
    var upvotes = 0;

    let query = Chapter.findOne({"_id": chapterTarget});
    query.exec((err, chapter) => 
    {    
        if (chapter === null)
        return res.status(404).json({error: "chapter not found"});
    
        upvotes = chapter.upvoteCount - 1;
        var query2 = Chapter.updateOne({"_id": chapter.id}, {upvoteCount: upvotes});
        query2.exec((err, chapters) => {

        });

        var query3 = User.updateOne({"_id": userTarget}, {$pull: {upvotes: chapter.id}}) 
        query3.exec((err, user) => {

        });

        res.status(200).json({upvotes: upvotes});
    });
});


// give a chapter id, get an upvote count
// query a JSON field of {"id": target}
Router.route('/upvoteCount').get((req, res) => 
{
    const chapterTarget = req.query.id;

    var query = Chapter.findOne({"_id": chapterTarget})
    query.exec((err, chapter) => {
        if(err) res.status(400).json('Error: ' + err)
        var count = chapter.upvoteCount;
        res.status(200).json({upvoteCount: count});
    });

});

// checks to see if chapter is upvoted by user
Router.route('/isUpvoted').get((req, res) =>
{
    const chapterTarget = req.query.chapterId;
    const user = req.query.userId;

    let query = User.findOne({"_id": user});
    query.exec((err, theUser) =>
    {
        if (theUser.upvotes.includes(chapterTarget))
        {
            return res.status(200).json({message: true});
        }

        else
        {
            return res.status(200).json({message: false});
        }

    });

});

module.exports = Router;

/**
 * @swagger
 * tags:
 *   name: Chapter
 *   description: All APIs relating to chapter management
 */

/**
 * @swagger
 * path:
 *  /chapter/getAll:
 *    get:
 *      summary: Get all chapters
 *      tags: [Chapter]
 *      requestBody:
 *        required: false
 *                         
 * 
 *      responses:
 *        "200":
 *          description: May god have mercy on your soul (again) if this doesn't return status 200
 */

 
/**
 * @swagger
 * path:
 *  /chapter/getById:
 *    get:
 *      summary: Given an array of objectIds, return the documents tied to them.
 *      tags: [Chapter]
 *      parameters:
 *       - in: query 
 *         name: chapters
 *         schema:
 *          type: array
 *          items:
 *           type: string
 *         description: chapter Ids to look for     
 * 
 *      responses:
 *          "200":
 *              description: normal
 */

/**
 * @swagger
 * path:
 *  /chapter/getByAuthor:
 *    get:
 *      summary: Given an author (can be multiple authors), return the chapters in which their name appears.
 *      tags: [Chapter]
 *      parameters:
 *       - in: query 
 *         name: author
 *         schema:
 *          type: array
 *          items:
 *           type: string
 *         description: author field goes here    
 * 
 *      responses:
 *          "200":
 *              description: normal
 */

 
 /**
 * @swagger
 * path:
 *  /chapter/addContender:
 *    post:
 *      summary: add a contender.
 *      tags: [Chapter]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - text
 *                - author
 *                - chapterId
 *              properties:
 *                title:
 *                  type: string
 *                text:
 *                  type: string
 *                author:
 *                  type: string
 *                chapterId:
 *                  type: string
 *              
 *      responses:
 *          "200":
 *              description: normal
 */

 
/**
 * @swagger
 * path:
 *  /chapter/delete:
 *    delete:
 *      summary: Given an ObjectId of a chapter/contender, delete it and all contenders associated with it.
 *      tags: [Chapter]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - chapter
 *              properties:
 *                chapter:
 *                   type: string
 * 
 *      responses:
 *          "200":
 *              description: chapter/contender is deleted
 *          "500":
 *              description: chapter isn't deleted, most likely because string couldn't be converted into objectId
 */

 
/**
 * @swagger
 * path:
 *  /chapter/upvoteInc:
 *    post:
 *      summary: Given an ObjectId of a chapter/contender, upvote it (warning, doesn't check to see if user has upvoted it already)
 *      tags: [Chapter]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - chapter
 *                - userId
 *              properties:
 *                chapter:
 *                   type: string
 *                userId:
 *                   type: string
 * 
 *      responses:
 *          "200":
 *              description: Contender is upvoted
 */

 
 
/**
 * @swagger
 * path:
 *  /chapter/upvoteDec:
 *    post:
 *      summary: Given an ObjectId of a chapter/contender, decrement the upvote count by 1 (warning, doesn't check to see if user has taken upvote back from it already)
 *      tags: [Chapter]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - chapter
 *                - userId
 *              properties:
 *                chapter:
 *                   type: string
 *                userId:
 *                   type: string
 * 
 *      responses:
 *          "200":
 *              description: user has taken back their upvoted
 */

 /**
 * @swagger
 * path:
 *  /chapter/upvoteCount:
 *    get:
 *      summary: Given an ObjectId of a chapter/contender, return the upvote count
 *      tags: [Chapter]
 *      parameters:
 *        - in: query 
 *          name: id
 *          schema:
 *             type: string
 *          description: objectId of chapter goes here 
 * 
 *      responses:
 *          "200":
 */

 /**
 * @swagger
 * path:
 *  /chapter/isUpvoted:
 *    get:
 *      summary: Given an ObjectId of a chapter/contender and a user, see if that user has already upvoted it.
 *      tags: [Chapter]
 *      parameters:
 *        - in: query 
 *          name: chapterId
 *          schema:
 *           type: string
 *           description: objectId of chapter goes here 
 *        - in: query
 *          name: userId
 *          schema:
 *           type: string
 *           description: objectId of user goes here
 * 
 *      responses:
 *          "200":
 */
