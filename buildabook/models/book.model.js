const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    NumberOfChapters: {
        type: String,
    
    },
    
    DateCreated: {
        type: String,
    
    },
    
    Views: {
        type: String,
    
    },
    
    AuthorArray: {
        type: String,
    
    },
    
    InProgressFlag: {
        type: String,
    
    },
    
    Comments: {
        type: String,
    
    },
    
    IsPremium: {
        type: String,
    
    },
    
    ExpirationDate: {
        type: String,
    
    },
    
    Duration: {
        type: String,
    
    },
    

});

const User = mongoose.model('User', userSchema);
module.exports = User;