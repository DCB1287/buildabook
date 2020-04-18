const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    
    title: {
        type: String,
        required: true
    },

    writingPrompt: {
        type: String,
        required: true
    },

    image: {
        type: String,
    },

    genre: {
        type: String,
    },
    
    chaptersArray: 
    [String],
    
    numberOfChapters: {
        type: Number,
        required: true
    
    },
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
    
    views: {
        type: Number,
        default: 1
    },
    
    authorArray: 
    [String],
    
    inProgressFlag: {
        type: Boolean,
        default: true
    },
    
    comments: 
    [String],
    
    expirationDate: {
        type: Date,
        
    },
    
    duration: {
        type: Number,
        default: 7
    },
    
    

});

/**
 * @swagger
 *  components:
 *    schemas:
 *      Book:
 *        type: object
 *        required:
 *          - title
 *          - writingPrompt
 *          - numberOfChapters
 *        properties:
 *          title:
 *            type: string
 *            description: Title of the book.
 *          writingPrompt:
 *            type: string
 *            description: Writing prompt of the book.
 *          image:
 *            type: string
 *            description: URL of image .
 *          genre:
 *            type: string
 *            description: Genre associated with book.
 *          chaptersArray:
 *            type: array
 *            items:
 *              type: string
 *            description: Contains objectIds in their HexString representation.
 *          numberOfChapters:
 *            type: integer
 *            description: Number of chapters the book will have.
 *          views:
 *            type: integer
 *            description: Number of views associated with the book
 *          authorArray:
 *            type: array
 *            items:
 *              type: string
 *            description: Contains objectIds that reference author of the book, and chapter contest winners.
 *          comments:
 *            type: array
 *            items:
 *              type: string
 *            description: Contains objectIds to comments associated with the book.
 *          dateCreated:
 *            type: Date
 *            description: Contains date of when this document was created.
 *          duration:
 *            type: integer
 *            description: Duration that chapter contests are opened and closed. Any value other than 2 will make duration 24 hours
 *        example:
 *           title: Plot twist No. 44 - The 
 *           writingPrompt: After a long day of phone calls, segmentation faults, and conferences that should've been emails, Tim unlocks the door to his home only to discover...
 *           image: https://vignette.wikia.nocookie.net/surrealmemes/images/f/ff/Noggin.png/revision/latest/scale-to-width-down/340?cb=20190114192842
 *           genre: Horror
 *           numberOfChapters: 5
 *           duration: 3
 */

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;