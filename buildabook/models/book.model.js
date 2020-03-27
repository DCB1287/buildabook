const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    NumberOfChapters: {
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
    
    authorArray: [
        {
            author: {
                type: String,
            }
        }          
    ],
    
    inProgressFlag: {
        type: Boolean,
        default: true
    },
    
    comments: [
        {
            comment: {
                type: String,
            }
        }
            
    ],
    
    expirationDate: {
        type: Date,
        
    },
    
    duration: {
        type: Date,
        required: true
    },
    

});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;