// Imported dependencies: middleware to mongoosedb.
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Allows the existence of the ".env" file.
require('dotenv').config();

// Initiates express server and defines a port.
const app = express();
const port = process.env.PORT || 3000;

//Middleware, allows us to parse json
app.use(cors());
app.use(express.json());

// Need a file in the same dir called ".env"
const uri = process.env.ATLAS_URI;

// Allows us to connect to mongodb. Flags are to allow
// use of updated functions.
mongoose.connect(uri, { useNewUrlParser: true,
     useCreateIndex: true, useUnifiedTopology: true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully")})

// Allows router files to be accessed via a URL
// i.e https://buildabook.herokuapp.com/contacts/add
const userConnection = require('./routers/usersAPI');
app.use('/api/user', userConnection);

const bookConnection = require('./routers/bookAPI');
app.use('/api/book', bookConnection);

const chapterConnection = require('./routers/chapterAPI.js');
app.use('/api/chapter', chapterConnection);

const commentConnection = require('./routers/commentAPI.js');
app.use('/api/comment', commentConnection);




if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('frontend/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
    });
  }

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});
