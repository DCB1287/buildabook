const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Text: {
        type: String,
        required
    },
    
    author: {
        type: ObjectId,
        ref: User,
        required
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

const User = mongoose.model('User', userSchema);
module.exports = User;