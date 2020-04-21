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
    
    booksCreated:
    [String],
    
    contributions:
    [String],
    
    upvotes:
    [String],

    followings: 
    [String],

    
    isVerified: {
        type: Boolean,
        default: false
    },

    verifyString: {
        type: String
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


/**
 * @swagger
 *  components:
 *    schemas:
 *      User:
 *        type: object
 *        required:
 *          - email
 *          - username
 *          - password
 *        properties:
 *          username:
 *            type: string
 *            description: Screen name of user.
 *          email:
 *            type: string
 *            description: Email of user.
 *          password:
 *            type: string
 *            description: Password of user. Should be encrypted
 *          bio:
 *            type: string
 *            description: Description of user, defined by user.
 *          booksCreated:
 *            type: array
 *            items:
 *             Type: string
 *            description: Contains book creation history of user (discontinued)
 *          contributions:
 *            type: array
 *            items:
 *              type: string
 *            description: contains chapters and contenders this user has created.
 *          upvotes:
 *            type: array
 *            items:
 *             Type: string
 *            description: contains objectIds of what user has upvoted.
 *          followings:
 *            type: array
 *            items:
 *             Type: string
 *            description: User receives updates on changes to books they want to see (discontinued)
 *          isVerified:
 *            type: Boolean
 *            description: flag to say user is verified
 *          verifyString:
 *            type: Date
 *            description: String used in verification through email
 *          isPremium:
 *            type: Boolean
 *            description: Has this user given us money?
 *          isBanned:
 *            type: Boolean
 *            description: If user has broken guidlines set to true
 *          isModerator:
 *            type: Boolean
 *            description: Flag that determines if user has elevated privlege (coming soon)
 *          dateCreated:
 *            type: Date
 *            description: Initialized on creation.
 *          upvoteTotal:
 *            type: Integer
 *            description: Should contain the number of upvotes user has accumulated (discontinued) 
 *          profilePic:
 *            type: String
 *            description: Link to profile pic
 * 
 *        
 */