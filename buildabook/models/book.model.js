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

    chaptersArray: 
    [
        {
            type: mongoose.Types.ObjectId,
        }
    ],
    
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
    [
        {
            author: {
                type: mongoose.Types.ObjectId,
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
                type: mongoose.Types.ObjectId,
            }
        }
            
    ],
    
    expirationDate: {
        type: Date,
        
    },
    
    duration: {
        type: Number,
        default: 7
    },
    
    

});

const Book = mongoose.model('Book', bookSchema);
module.exports = Book;