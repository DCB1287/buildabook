const Router = require('express').Router();
const mongoose = require('mongoose');
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
    const targets = req.query.books;
    let query = Book.find ({_id: targets});
    query.exec((err, books) => {
        if(err) res.send(err);
        res.json(books);
    });
});

// Get by title
Router.route('/getByTitle').get((req, res) => 
{
    const title = req.query.title;
    if (!title) {
        return res.status(404).json("Title missing")
    }
    Book.findOne({ title })
        .then(book => { res.status(200).json(book)})
        .catch(err => { res.status(400).json("Book not found:" + err) })
})

// Get books by Author
Router.route('/getByAuthor').get((req, res) =>
{
    const targets = req.query.authors;

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
        const genre = req.body.genre;
        
        authorArray.push(author);

        const newBook = new Book({
            title,
            writingPrompt,
            image,
            numberOfChapters,
            duration,
            authorArray,
            genre,
            expirationDate: null
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
            .catch(err => res.status(400).json({error: 'Error: ' + err}));
        })
        
    });


// Delete a Book
    // Send the id of the book
        // Router also grabs all chapters
        // all chapters associated with book is deleted
Router.route('/delete').delete((req, res) => {
    const id = req.body._id;
    var temp;
    var chapters = [];
    var contenders = [];
    
    
    
    // delete chapters associated with the book

    // query to find the book
    var query = Book.findOne({_id: id});
    query.exec((err, book) => {
        
        if(err) return res.status(500).send(err);

        //delete contenders then chapters
        if(book != null && book.chaptersArray != null)
        {
            // get chapter array associated with book
            chapters = [...book.chaptersArray];
            temp = [...chapters];
            chapters.forEach(String => {

                // for each chapter...
                let query2 = Chapter.findOne({_id: String})
                query2.exec((err, chapter) => {

                    // find the list of contenders for the chapter
                    if (chapter.contenders != null)
                    {
                        contenders = [...chapter.contenders];
                        contenders.forEach(String2 => 
                        {
                            // delete the contenders
                            let query = Chapter.deleteOne({_id: String2});
                            query.exec((err, chapter) => {
                                if(err) return res.send(err);
                            });
                        });
                    }
                });

                // delete the main chapters
                let query = Chapter.deleteOne({_id: String});
                query.exec((err, chapter) => 
                {
                    if(err) return res.send(err);
                });

            });  
        }
    });
    
    // delete the book
    Book.deleteOne({_id: id}, (err, book) =>
        {
            if(err) return res.status(500).send(err);
            
            return res.status(200).json({message: "Book " + id + " deleted! " + temp});
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


/**
 * @swagger
 * tags:
 *   name: Book
 *   description: All APIs relating to book management
 */

/**
 * @swagger
 * path:
 *  /book/getAll:
 *    get:
 *      summary: Get all books
 *      tags: [Book]
 *      requestBody:
 *        required: false
 *                         
 * 
 *      responses:
 *        "200":
 *          description: May god have mercy on your soul if this doesn't return status 200
 */

/**
 * @swagger
 * path:
 *  /book/getById:
 *    get:
 *      summary: Given an array of objectIds, return the documents tied to them.
 *      tags: [Book]
 *      parameters:
 *       - in: query 
 *         name: books
 *         schema:
 *          type: array
 *          items:
 *           type: string
 *         description: book Ids to look for     
 * 
 *      responses:
 *          "200":
 *              description: normal
 */

/**
 * @swagger
 * path:
 *  /book/getByAuthor:
 *    get:
 *      summary: Given an author, return the books in which their name appears.
 *      tags: [Book]
 *      parameters:
 *       - in: query 
 *         name: authors
 *         schema:
 *           type: string
 *         description: author field goes here    
 * 
 *      responses:
 *          "200":
 *              description: normal
 */

 /**
 * @swagger
 * path:
 *  /book/add:
 *    post:
 *      summary: add a book.
 *      tags: [Book]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - title
 *                - writingPrompt
 *                - numberOfChapters
 *              properties:
 *                title:
 *                  type: string
 *                writingPrompt:
 *                  type: string
 *                numberOfChapters:
 *                  type: integer
 *                image:
 *                  type: string
 *                author:
 *                  type: string
 *                duration:
 *                  type: integer
 *                genre:
 *                  type: string
 *              
 *      responses:
 *          "200":
 *              description: normal
 */

  
/**
 * @swagger
 * path:
 *  /book/delete:
 *    delete:
 *      summary: Given an ObjectId of a book, delete it and all objects associated with it.
 *      tags: [Book]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - _id
 *              properties:
 *                _id:
 *                   type: string
 * 
 *      responses:
 *          "200":
 *              description: book is deleted
 *          "500":
 *              description: book isn't deleted, most likely because string couldn't be converted into objectId
 */

 /**
 * @swagger
 * path:
 *  /book/deleteAll:
 *    delete:
 *      summary: The self destruct button from every T.v trope you've ever seen. (Deletes all books and chapters from database)
 *      tags: [Book]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 * 
 *      responses:
 *          "200":
 *              description: all books are deleted
 *         
 */


module.exports = Router;