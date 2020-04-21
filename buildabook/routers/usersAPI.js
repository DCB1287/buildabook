const Router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
let User = require('../models/user.model');
const nodemailer = require('nodemailer');
const randomStr = require('@supercharge/strings')

// Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');



//Get user data based on id, leaving out the hashed password.
Router.route('/').get((req, res) => {
    User.findbyId(req.user.id)
        .select('-password')
        .then(user => res.json(user))
});

//Get user data based on email, leaving out the hashed password.
Router.route('/getByUserEmail').post((req, res) => {
  console.log("in get by user email")
  console.log("inside user email api"+req.body.email)
  User.findOne({"email" : req.body.email})
      .select('-password')
      .then(user => res.json(user))
});

//get user data based on username, leaving out the hashed password.
Router.route('/getByUsername').get((req, res) =>
{
    const targets = req.query.username;
    User.findOne({"username": targets})
        .select("-password")
        .then(user => res.json(user)) 
});

//User login
Router.route('/login').post((req, res) => {
    const password = req.body.password;
    const email = req.body.email;

    // Simple validation
  if(!email || !password) {
    return res.status(400).json('Please enter all fields');
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(!user) return res.status(400).json('User does not exist.');
      
      //Validate the password
      bcrypt.compare(password, user.password)
        .then(isMatch => {
            if(!isMatch) return res.status(400).json('Invalid password. Try again.')

            jwt.sign(
                { id: user.id, username: user.username },
                process.env.jwtSecret,
                { expiresIn: 10000 },
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      username: user.username,
                      email: user.email
                    }
                  });
                }
              )
        })

      
    })   
});



//User signup
Router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const currentDate = new Date();
    const randomVerificationString = randomStr.random(50)

    // Simple validation
  if(!username || !email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields' });
  }

  // Check for existing user
  User.findOne({ email })
    .then(user => {
      if(user) return res.status(400).json({ msg: 'User already exists' });

      const newUser = new User({
        username,
        email,
        password,
        bio: "",
        booksCreated: [],
        contributions: [],
        upvotes: [],
        followings: [],
        isVerified: false,
        isPremium: false,
        isBanned: false,
        isModerator: false,
        verifyString: randomVerificationString,
        dateCreated: currentDate.toString(),
        upvoteTotal: 1,
        profilePic: "default.jpg"
      });

      // Create salt & hash and send a token back with the user's id and username
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if(err) throw err;
          newUser.password = hash;
          newUser.save()
            .then(user => {
              jwt.sign(
                { id: user.id, username: user.username },
                process.env.jwtSecret,
                { expiresIn: 10000 },
                (err, token) => {
                  if(err) throw err;
                  res.json({
                    token,
                    user: {
                      id: user.id,
                      username: user.username,
                      email: user.email
                    }
                  });
                }
              )
            });
        })
      })
    })
    let transport = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: 'buildabookserviceteam@gmail.com',
        pass: 'PooP1212'
           }
    });

    const message = {
      from: 'User_Verification@Buildabook.com',
      to: email,
      subject: 'Verification',
      text: 'Thank you for registering with Buildabook, your verifcation code is: '+ randomVerificationString
  };

  transport.sendMail(message,function(err, info){
    if(err){
      console.log(err)
    }
    else{
      console.log(info);
    }
  });
});

Router.route('/resend').post((req, res,next) => {
  const userEmail = req.body.email;
  const randomVerificationString = randomStr.random(50)

  let query = User.findOne({"email":userEmail})

  query.exec((err,target) => {
    if(target == null)
      next(err) 
    else{
      User.updateOne({"email":userEmail},{"verifyString":randomVerificationString})
      .then(user => res.json(user))
    }
  })

   let transport = nodemailer.createTransport({
      service: 'gmail',
      auth:{
        user: 'buildabookserviceteam@gmail.com',
        pass: 'PooP1212'
        }
    });

    const message = {
      from: 'User_Verification@Buildabook.com',
      to: userEmail,
      subject: 'Verification',
      text: 'Thank you for registering with Buildabook, your verifcation code is: '+ randomVerificationString
  };

  transport.sendMail(message,function(err, info){
    if(err){
      console.log(err)
    }
    else{
      console.log(info);
    }
  });
});

Router.route('/verifyUser').post((req, res,next) => {

  let query = User.findOne({verifyString:req.body.verificationCode})

  query.exec((err,target) => {
    if(target == null)
      next(err) 
    else{
      User.updateOne({"verifyString":req.body.verificationCode},{"isVerified":true})
      .then(user => res.json(user))
    }
  })

});

Router.route('/changePassword').post((req, res,next) => {

  console.log("User id is "+req.body.userId)

  console.log("User password"+req.body.newPassword)

  let newUserPassword = req.body.newPassword

  let newHashedPassword

  let query = User.findOne({"_id":req.body.userId})

  query.exec((err,target) => {
    if(target == null)
      next(err) 
  
    else{

       bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUserPassword, salt, (err, hash) => {
          if(err) throw err;
            newUserPassword = hash;
             User.updateOne({"_id":req.body.userId},{"password":hash})
              .then(user => res.json(user))

            });
        })
    }
  })

});


/**
 * @swagger
 * tags:
 *   name: User
 *   description: All APIs relating to User management
 */

 
/**
 * @swagger
 * path:
 *  /user/getByUserEmail:
 *    post:
 *      summary: Get user based on Email address
 *      tags: [User]
 *      requestBody:
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *              properties:
 *                email:
 *                  type: string
 *                         
 * 
 *      responses:
 *        "200":
 *          description: May god have mercy on your soul if this doesn't return status 200
 */


/**
 * @swagger
 * path:
 *  /user/getByUsername:
 *    post:
 *      summary: Get user based on Username
 *      tags: [User]
 *      parameters:
 *       - in: query 
 *         name: username
 * 
 *      responses:
 *        "200":
 *          description: Should return a JSON containing a user
 */


/**
 * @swagger
 * path:
 *  /user/login:
 *    post:
 *      summary: Get user based on Username
 *      tags: [User]
 *      requestBody:
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 * 
 *      responses:
 *        "200":
 *          description: Should return message and a cookie
 */

/**
 * @swagger
 * path:
 *  /user/add:
 *    post:
 *      summary: Add a user
 *      tags: [User]
 *      requestBody:
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *                - password
 *                - username
 *              properties:
 *                email:
 *                  type: string
 *                password:
 *                  type: string
 *                username:
 *                  type: string
 * 
 *      responses:
 *        "200":
 *          description: Should return message and a cookie
 */


/**
 * @swagger
 * path:
 *  /user/resend:
 *    post:
 *      summary: Resend an email
 *      tags: [User]
 *      requestBody:
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - email
 *              properties:
 *                email:
 *                  type: string
 * 
 *      responses:
 *        "200":
 *          description: Rsends a verification link
 */


/**
 * @swagger
 * path:
 *  /user/verifyUser:
 *    post:
 *      summary: Given a verification string sent in an email, make a user verified.
 *      tags: [User]
 *      requestBody:
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - verificationCode
 *              properties:
 *                verificationCode:
 *                  type: string
 *      responses:
 *        "200":
 *          description: Verifies user
 */


/**
 * @swagger
 * path:
 *  /user/changePassword:
 *    post:
 *      summary: Change a password
 *      tags: [User]
 *      requestBody:
 *         content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - userId
 *                - newPassword
 *              properties:
 *                userId:
 *                  type: string
 *                newPassword:
 *                  type: string
 *      responses:
 *        "200":
 *          description: new password should now be set.
 */




module.exports = Router;