
//switch node to test?
process.env.NODE_ENV = 'test'
console.log(process.env.NODE_ENV)
let mongoose = require('mongoose')
let Book = require('../models/book.model')
let Chapter = require('../models/chapter.model')

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
        })

        Chapter.remove({}, (err) => {
        })
        done()
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

            // Ok, here's the funny business:
            // function calls to mongoDB return a promise that it will eventually execute
            // to use threading commands like await, we can only call it in async functions, which chai appears not to be
            // to overcome this, create a nested asynchronous function that contains what you want to do
            // make sure to name it, and cal it in the test field.
            // this will allow Node.js to wait for mongodb to complete the operation and not return IOUs
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
            
            // execute test2
            test2();
        })
    })

    
    // Get one Book
    describe('GetBooks', function() {
        it('should return a single book', (done) => {
            // We'll need to be a known id here
            
            async function test2 () 
            {
                const book = new Book({
                    title:"test",
                    writingPrompt:"test",
                    image:"test",
                    numberOfChapters:"1",
                    duration:"1",
                    authorArray:[],
                    genre: "test"
                })
                
                
                
                await Book.create(book);

                let query = Book.findOne({});
                 query.exec((err, bookT) => {
                    var targetId = typeof String;
                    targetId = bookT._id;
                    //console.log(targetId)

                    chai.request(server)
                    // May have to change name because we haven't named it yet
                    .get('/api/book/getById?books=' + targetId)
                    .end((err, res) => {
                        //console.log(res.body)
                        //console.log(res.status)
                        res.should.have.status(200)
                        res.body.should.be.a('array')
                        res.body.length.should.be.eql(1);
                        done()
                    })
                })
            }

            test2();
        })

        it('should return empty array if it does not exist', (done) => {
            // We'll need to be a known id here that isn't there
            const id = "5e97f48f97a32a1e68dfa699";
            chai.request(server)
                .get(`/api/book/getById?books=${id}`)
                .end((err, res) => {
                    //console.log(res.body)
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.should.be.empty;
                    done()
                })
        })
    })

    // Get one Book
    describe('Get Books By Author', function() {
        it('should return a single book', (done) => {
            // We'll need to be a known id here
            
            async function test2 () 
            {
                const book = new Book({
                    title:"test",
                    writingPrompt:"test",
                    image:"test",
                    numberOfChapters:"1",
                    duration:"1",
                    authorArray:["author1"],
                    genre: "test"
                })
                
                const book2 = new Book({
                    title:"test",
                    writingPrompt:"test",
                    image:"test",
                    numberOfChapters:"1",
                    duration:"1",
                    authorArray:["author2"],
                    genre: "test"
                })
                
                
                
                await Book.create(book);


                chai.request(server)
                // May have to change name because we haven't named it yet
                .get('/api/book/getByAuthor?authors=' + "author1")
                .end((err, res) => {
                    //console.log(res.body)
                    //console.log(res.status)
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(1);
                    done()
                })
            }

            test2();
        })

        it('should return empty array if it does not exist', (done) => {
            // We'll need to be a known id here that isn't there
            const id = "5e97f48f97a32a1e68dfa699";
            chai.request(server)
                .get(`/api/book/getByAuthor?authors=tim`)
                .end((err, res) => {
                    //console.log(res.body)
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.should.be.empty;
                    done()
                })
        })
    })

    // Delete a Book
    describe('DeleteBook', function() {
        it('DeleteBook should delete a book', (done) => {
            
            async function test2 () 
            {
                await Book.create(testBook)

                chai.request(server)
                    // May have to change name because we haven't named it yet
                    .delete(`/api/book/delete`)
                    .send({_id: testBook._id})
                    .end((err, res) => {
                        //console.log(res.body)
                        res.should.have.status(200)
                        res.body.should.be.a('Object')
                        res.body.should.have.property('message')
                        .eql('Book 5e97f48f97a32a1e68dfa6f2 deleted! ')
                        done()
                    })
            }

            test2();
        })

        it('DeleteBook should show message as above but tagged with undefined', (done) => {
            async function test3 () 
            {
                await Book.create(testBook)

                chai.request(server)
                    // May have to change name because we haven't named it yet
                    .delete(`/api/book/delete`)
                    .send({_id: "5e97f48f97a32a1e68dfa6f9"})
                    .end((err, res) => {
                        //console.log(res.body)
                        res.should.have.status(200)
                        res.body.should.be.a('Object')
                        res.body.should.have.property('message')
                        .eql('Book 5e97f48f97a32a1e68dfa6f9 deleted! undefined')
                        done()
                    })
            }

            test3();
        })
    })
})