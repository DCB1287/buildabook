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
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
    
    contenders: 
    [String],    
    
});

const Chapter = mongoose.model('Chapter', chapterSchema);
module.exports = Chapter;