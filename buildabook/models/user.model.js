const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Username: {
        type: String,
    
    },
    
    Email: {
        type: String,
    
    },
    
    Password: {
        type: String,
    
    },
    
    Bio: {
        type: String,
    
    },
    
    BooksCreated: {
        type: [String],
    
    },
    
    Contributions: {
        type: [String],
    
    },
    
    Followings: {
        type: [String],
    
    },
    
    IsVerified: {
        type: Boolean,
    
    },
    
    IsPremium: {
        type: Boolean,
    
    },
    
    IsBanned: {
        type: Boolean,
    
    },
    
    IsModerator: {
        type: Boolean,
    
    },

    // Might be unecessary as mongodb carries info of
    // Updates and Creations
    DateCreated: {
        type: Date,
        default: Date.now,
    
    },
    
    UpvoteTotal: {
        type: Number,
    
    },
    
    ProfilePic: {
        type: String,
    
    },    
    

});

const User = mongoose.model('User', userSchema);
module.exports = User;