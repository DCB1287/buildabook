
//switch node to test?
process.env.NODE_ENV = 'test'
console.log(process.env.NODE_ENV)
let mongoose = require('mongoose')
let Book = require('../models/book.model')

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()
let server = require('../server')



//Test data
const data = require('./testDataBook')
const testBook = data.testBook
const testBookArray = data.testBookArray

//Config Chai
chai.use(chaiHttp)
//address of local host server

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

//Book Tests

//This will dump the contents of the book collection
// describe('EmptyBookDB', function (){
describe('BookAPI', function() {
    // Remove each Book before each test
    beforeEach((done) => {
        Book.remove({}, (err) => {
            done()
        })
    })
    //Get all Books 
    describe('/api/book/getAll', function() {
        it('should return an empty array of books', (done) => {
            chai.request(server)
                //May have to change name because we haven't named it yet
                .get('/api/book/getAll')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.equal(0)
                    done()
                })
        })
    })  

    // Add a Book
    describe('AddBook', function() {
        it('should not add a book without a title, writingPrompt, and numberOfChapters', (done) => {
            let Book = {
                "title": "",
                "writingPrompt": "",
                "image": "",
                "numberOfChapters": "",
                "duration": "",
                "author": ""
            }
            chai.request(server)
                // May have to change name because we haven't named it yet
                .post(`/api/book/add`)
                .send(Book)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('error')
                    .eql("Missing fields: title writingPrompt numberOfChapters");
                    done()
                })
        })

        it('should add a book to the database', (done) => {
            
            chai.request(server)
                // May have to change name because we haven't named it yet
                .post(`/api/book/add`)
                .send(testBook)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object');
                    res.body.should.have.property('message')
                    .eql('Book added!')
                    done()

                })
        })
    })

    // Get all Books in DB
    describe('/api/book/getAll',  function test () {
        it('should return an array of books', (done) => {
          
          async function test2 () 
          {
            await Book.insertMany(testBookArray);
                

                chai.request(server)
                    // May have to change name because we haven't named it yet
                    .get('/api/book/getAll')
                    .end((err, res) => {
                        res.should.have.status(200)
                        //console.log(res.body)
                        res.body.should.be.a('array')
                        res.body.length.should.be.eql(testBookArray.length)
                        done()
                    })
          }

          test2();
            
        })
    })

    
    // Get one Book
    describe('GetBooks', function() {
        it('should return a single book', (done) => {
            // We'll need to be a known id here
            const book = new Book({
                title:"test",
                writingPrompt:"test",
                image:"test",
                numberOfChapters:"1",
                duration:"1",
                authorArray:[],
                genre: "test"
            })
            
            var targetId;
            
            Book.insertOne(book);
            let query = Book.findOne({});
            query.exec((err, bookT) => {
                targetId = bookT.id;
            })
            
            setTimeout(it, 1000)

            chai.request(server)
            // May have to change name because we haven't named it yet
            .get('/api/book/getById?id=' + targetId)
            .end((err, res) => {
                console.log(res.body)
                console.log(res.status)
                res.should.have.status(200)
                res.body.should.be.a('array')
                done()
            })
        })

        it('should not get a book if it does not exist', (done) => {
            // We'll need to be a known id here that isn't there
            const id = 0
            chai.request(server)
                .get(`/api/book/get=?${id}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('string')
                    done()
                })
        })
    })
    // Edit a Book
    describe('EditBook', function() {
        it('should update a book', (done) => {
            let book = new Book(testBook)
            book.save((err, book) => {
                chai.request(server)
                // May have to change name because we haven't named it yet
                .post(`/api/book/edit?=${book._id}`)
                .send(testBookArray[1])
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('string')
                    done()
                })
            })
        })
        it('should not update a book with an id that does not exist', (done) => {
            chai.request(server)
                // May have to change name because we haven't named it yet
                .post(`/api/book/edit?=${0}`)
                .send(testBookArray[1])
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('string')
                    done()
                })
        })
    })
    
    // Delete a Book
    describe('DeleteBook', function() {
        it('DeleteBook should delete a book', (done) => {
            let book = new Book(testBook)
            book.save((err, book) => {
                chai.request(server)
                    // May have to change name because we haven't named it yet
                    .delete(`/api/book/delete=?${book._id}`)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('string')
                        done()
                    })
                })
        })

        it('DeleteBook should not delete a book that does not exist', (done) => {
            //Should be a known id that does not exist
            let book = new Book(testBook)
            book.save((err, book) => {
                chai.request(server)
                    // May have to change name because we haven't named it yet
                    .delete(`/api/book/delete=?${book._id}`)
                    .end((err, res) => {
                        res.should.have.status(404)
                        res.body.should.be.a('string')
                        done()
                    })
                })
        })
    })
})