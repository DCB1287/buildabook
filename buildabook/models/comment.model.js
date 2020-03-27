const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
    Text: {
        type: String,
        required: true
    },
    
    author: {
        type: String,
        required: true
    },
    
    dateCreated: {
        type: Date,
        default: Date.now
    },
    
    LastEdit: {
        type: Date,
        
    },
    
    Upvotes: {
        type: Number,
        default: 1
    },
    
    
    

});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;