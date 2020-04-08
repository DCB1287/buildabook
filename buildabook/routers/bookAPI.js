const Router = require('express').Router();
const mongoose = require('mongoose');
const timer = require('timers');
let Book = require('../models/book.model');
let Chapter = require('../models/chapter.model')

// Get all the Books for the books table.  Just include image, title, authors, writingPrompt, inProgress, expirationDate
Router.route('/getAll').get((req, res) =>
{
    let query = Book.find({});
    query.exec((err, books) => {
        if(err) res.send(err);
        res.json(books);
    });
});

// Get books by Id
// can be multiple ids
Router.route('/getById').get((req, res) =>
{
    const targets = [...req.body.books];

    let query = Book.find ({_id: targets});
    query.exec((err, books) => {
        if(err) res.send(err);
        res.json(books);
    });
});

// Get books by Author
Router.route('/getByAuthor').get((req, res) =>
{
    const targets = req.body.authors;

    let query = Book.find ({authorArray: targets} );
    query.exec((err, books) => {
        if(err) res.send(err);
        res.json(books);
    });
});


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
        var author = Object.assign( req.body.author, mongoose.Types.ObjectId);
        var authorArray = [];
        
        authorArray.push(author);

        const newBook = new Book({
            title,
            writingPrompt,
            image,
            numberOfChapters,
            duration,
            authorArray
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
         if(book) return res.status(400).json({ error: 'Book with same name already exists' });
           newBook.save()
            .then(() => res.status(200).json({message: 'Book added!'}))
            .catch(err => res.status(400).json({error: 'Error: ' + err));
        })
        
    });


// Delete a Book
    // Send the id of the book
        // Router also grabs all chapters
        // all chapters associated with book is deleted
Router.route('/delete').delete((req, res) => {
    const id = req.body._id;
    var chapters = [];
    var contenders = [];
    Book.findByIdAndDelete(id, (err, book) =>
        {
            if(err) return res.send(err);
            
            else if(book == null)
            {
                return res.status(404)
                .json({error: "can't find " + id + " in the database!"});
            }
            else {
                if(book != null && book.chaptersArray != [])
                chapters = [...book.chaptersArray];
                
                if(chapters != null && chapters != [])
                chapters.forEach(String => {
                   let query = Chapter.findByIdAndRemove(String);
                   query.exec((err, chapters) => 
                   {
                       if(err) return res.send(err);
                       
                       if (chapters != null && chapters.contenders != null)
                       {
                        contenders = [...chapters.contenders];
                        contenders.forEach(String2 => 
                         {
                             let query = Chapter.findByIdAndRemove(String2);
                             query.exec();
                         });
                       }
                       
                   });
                });

                return res.status(200).json({message: "Book " + id + " deleted!"});
            }
           
        }
    );

    
   
});

// Delete all Books and chapters
Router.route('/deleteAll').delete((req, res) => {
    
    let query = Book.deleteMany({});
    let query2 = Chapter.deleteMany({});
    query2.exec((err, chapters) =>
    {
        // do nothing
    });

    query.exec((err, books) => {
        if(err) res.send(err);
        res.json({message: "all books and chapters deleted!"});
    });

    
});

// Edit a Book?

// Add Chapter to Book

// Add Chapter to Contenders

// Timed Events when Chapter Date is changed





module.exports = Router;