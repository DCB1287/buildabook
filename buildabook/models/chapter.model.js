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
        type: mongoose.Types.ObjectId,
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
    
    comments: [
        {
            comment: {
                type: String,
            }
        }
            
    ],
    
    upvoteCount: {
        type: Number,
        default: 1
    },
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
    
    contenders: [
        {
            contender: {
                type: mongoose.Types.ObjectId,
            }
        }
    ],    
    
});

const Chapter = mongoose.model('Chapter', chapterSchema);
module.exports = Chapter;