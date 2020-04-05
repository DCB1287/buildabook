const Router = require('express').Router();

let Book = require('../models/book.model');

// Get all the Books for the books table.  Just include image, title, authors, writingPrompt, inProgress, expirationDate
// to save space.

// Get Books from array of IDs

// Create a Book
    // initialize book
        // title (required)
        // writingPrompt (required)
        // image 
        // numberOfChapters (required)
        // Duration (coming soon) 
    Router.route('/add').post((req, res) => {
        var msg2 = "";
        const title = req.body.title;
        const writingPrompt = req.body.writingPrompt;
        const image = req.body.image;
        const numberOfChapters = req.body.numberOfChapters;
        const duration = req.body.duration;
        
        const newBook = new Book({
            title,
            writingPrompt,
            image,
            numberOfChapters,
            duration
        })

        if(title == ""|| writingPrompt  == "" || numberOfChapters  == "") {
            if (title == "")
                msg2 += "title ";
            if (writingPrompt  == "")
                msg2 += "writingPrompt "
            if (numberOfChapters == "")
                msg2 += "numberOfChapters"

            return res.status(400).json({error: "Missing fields: " + msg2});
            }

       // see if any book has the same title
       Book.findOne({ title })
       .then(book => {
         if(book) return res.status(400).json({ msg: 'Book with same name already exists' });
           newBook.save()
            .then(() => res.status(200).json('Book added!'))
            .catch(err => res.status(400).json('Error: ' + err));
        })
        
    });


// Delete a Book
    // Send the id of the book
        // Router also grabs 
Router.route('/delete').post((req, res) => {
    const _id = req.body._id;

    // find da book

   // see if any book has the same title
   Book.findOne({ title })
   .then(book => {
     if(book) return res.status(400).json({ msg: 'Book with same name already exists' });

        const newBook = new Book({
            title,
            writingPrompt,
            image,
            numberOfChapters,
            duration
        })

        newBook.save()
        .then(() => res.status(200).json('Book added!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    
});

// Edit a Book?

// Add Chapter to Book

// Add Chapter to Contenders

// Timed Events when Chapter Date is changed





module.exports = Router;