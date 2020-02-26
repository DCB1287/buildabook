const Router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
let User = require('../models/user.model');


//Get user data based on id, leaving out the hashed password.
Router.route('/').get((req, res) => {
    User.findbyId(req.user.id)
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
        password
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
    
});

module.exports = Router;
