const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    
    email: {
        type: String,
        unique: true,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },
    
    bio: {
        type: String,
    
    },
    
    booksCreated: [
        {
            book: {
                type: mongoose.Types.ObjectId,
            }
        }
    ],
    
    contributions: [
        {
            book: {
                type: mongoose.Types.ObjectId,
            }
        }
    ],
    
    followings: [
        {
            book: {
                type: mongoose.Types.ObjectId,
            }
        }
    ],
    
    isVerified: {
        type: Boolean,
        default: false
    },
    
    isPremium: {
        type: Boolean,
        default: false
    },
    
    isBanned: {
        type: Boolean,
        default: false
    },
    
    isModerator: {
        type: Boolean,
        default: false
    },

    // Might be unecessary as mongodb carries info of
    // Updates and Creations
    dateCreated: {
        type: Date,
        default: Date.now,
    
    },
    
    upvoteTotal: {
        type: Number,
        default: 1
    },
    
    profilePic: {
        type: String,
    
    },    
    

});

const User = mongoose.model('User', userSchema);
module.exports = User;