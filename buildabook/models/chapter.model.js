const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
        required
    },
    
    comments: [
        {
            comment: {
                type: ObjectId,
                ref: Comment
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
                type: ObjectId,
                ref: Chapter
            }
        }
    ],    
    

});

const User = mongoose.model('User', userSchema);
module.exports = User;