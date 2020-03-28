const Router = require('express').Router();

let Book = require('../models/book.model');

// Get all the Books

// Get Books from array of IDs

// Create a Book
    // initialize book
        // title
        // writingPrompt
        // image
        // numberOfChapters
        // (Soon to be added) Duration
    Router.route('/add').post((req, res) => {
        const title = req.body.title;
        const writingPrompt = req.body.writingPrompt;
        const image = req.body.image;
        const numberOfChapters = req.body.numberOfChapters;
        const duration = req.body.duration;
        
        if(!title || !writingPrompt || !numberOfChapters) {
            return res.status(400).json({ msg: 'Please enter all fields' });
            }

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


// Delete a Book?

// Edit a Book?

// Add Chapter to Book

// Add Chapter to Contenders

// Timed Events when Chapter Date is changed





module.exports = Router;