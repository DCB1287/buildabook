const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Text: {
        type: String,
    
    },
    
    Author: {
        type: String,
    
    },
    
    DateCreated: {
        type: String,
    
    },
    
    LastEdit: {
        type: String,
    
    },
    
    Upvot: {
        type: String,
    
    },
    
    
    

});

const User = mongoose.model('User', userSchema);
module.exports = User;