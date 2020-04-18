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

//Get user data based on username, leaving out the hashed password.
Router.route('/getByUsername').get((req, res) => {
  User.findOne({"username" : req.query.username})
      .select('-password')
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


module.exports = Router;