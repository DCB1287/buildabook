const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    
    text: {
        type: String,
        required: true
    },
    
    author: {
        type: String,
        required: true
    },
    
    expirationDate: {
        type: Date,
        required: true
    },

    startDate: {
        type: Date,
        required: true
    },
    
    comments: 
    [String],
    
    upvoteCount: {
        type: Number,
        default: 1
    },

    inProgressFlag: {
        type: Boolean,
    },

    dateCreated: {
        type: Date,
        default: Date.now
    },
    
    contenders: 
    [String],    
    
});

/**
 * @swagger
 *  components:
 *    schemas:
 *      Chapter:
 *        type: object
 *        required:
 *          - title
 *          - text
 *          - author
 *          - expirationDate
 *          - startDate
 *        properties:
 *          title:
 *            type: string
 *            description: Title of the chapter.
 *          text:
 *            type: string
 *            description: contents of the chapter.
 *          author:
 *            type: string
 *            description: author of the chapter
 *          expirationDate:
 *            type: Date
 *            description: date the contest for this chapter ends. (if this isn't contender)
 *          startDate:
 *            type: Date
 *            description: when the contest for this chapter opens. (if this isn't a contender)
 *          comments:
 *            type: array
 *            items:
 *              type: string
 *            description: contains the objectIds of comments.
 *          upvoteCount:
 *            type: integer
 *            description: number of users who have upvoted this contender/chapter.
 *          inProgressFlag:
 *            type: boolean
 *            description: flag that determines if this chapter is open for submissions
 *          dateCreated:
 *            type: Date
 *            description: Date that this chapter/contender was created.
 * 
 *        example:
 *           title: Chapter 1- What could possibly go wrong?
 *           text: Archduke franz ferdinand of Austria had just dodged an assasination attempt via carriage. To calm his nerves he bought a sandwich. As he was taking a bite he thought to himself "what could possibly go wrong?" 
 *           author: 0123456789abcdef
 *           expirationDate: new Date()
 *           numberOfChapters: 5
 *           duration: 3
 */

const Chapter = mongoose.model('Chapter', chapterSchema);
module.exports = Chapter;