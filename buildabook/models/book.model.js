const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
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
                type: ObjectId,
                ref: User
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
                type: ObjectId,
                ref: Comment
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

const User = mongoose.model('User', userSchema);
module.exports = User;