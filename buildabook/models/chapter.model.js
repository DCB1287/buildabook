const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Title: {
        type: String,
    
    },
    
    Text: {
        type: String,
    
    },
    
    Author: {
        type: String,
    
    },
    
    Expiration: {
        type: String,
    
    },
    
    Comments: {
        type: String,
    
    },
    
    UpvoteCount: {
        type: String,
    
    },
    
    DateCreated: {
        type: String,
    
    },
    
    Contenders: {
        type: String,
    
    },    
    

});

const User = mongoose.model('User', userSchema);
module.exports = User;