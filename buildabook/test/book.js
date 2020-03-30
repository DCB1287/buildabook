
//switch node to test?
process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let Book = require('../models/book.model')

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

//Test data
const data = require('./testData')
testBook = data.testBook
testChapter = data.testChapter

//Config Chai
chai.use(chaiHttp)
//address of local host server
const server = 'http://localhost:3000'


//Book Tests

//This will dump the contents of the book collection
// describe('EmptyBookDB', function (){
//     Remove each Book before each test
//     beforeEach((done) => {
//         Book.remove({}, (err) => {
//             done()
//         })
//     })
//     Get all Books 
//     describe('GetAllBooks', function() {
//         it('GetAllBooks should return an array of books', (done) => {
//             chai.request(server)
//                 May have to change name because we haven't named it yet
//                 .get('/api/book/getAll')
//                 .end((err, res) => {
//                     res.should.have.status(200)
//                     res.body.should.be.a('array')
//                     res.body.should.be.eql(0)
//                     done()
//                 })
//         })
//     })  
// }) 


describe('BookAPI', function() {
    // Add a Book
    describe('AddBook', function() {
        it('AddBook should not add a book without a title, writingPrompt, and numberOfChapters', (done) => {
            const testBook = {
                title: "",
                writingPrompt: "",
                image: "",
                numberOfChapters: "",
                duration: ""
            }
            chai.request(server)
                // May have to change name because we haven't named it yet
                .post(`/api/book/add`)
                .send(testBook)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('object')
                    done()
                })
        })

        it('AddBook should add a book to the database', (done) => {
            //Check if book has correct properties
            testBook.body.should.have.property('title')
            testBook.body.should.have.property('writingPrompt')
            testBook.body.should.have.property('numberOfChapters')
            testBook.body.should.have.property('duration')
            testBook.body.title.should.be.a('string')
            testBook.body.writingPrompt.should.be.a('string')
            testBook.body.numberOfChapters.should.be.a('number')
            testBook.body.duration.should.be.a('number')
            chai.request(server)
                // May have to change name because we haven't named it yet
                .post(`/api/book/add`)
                .send(testBook)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('string')
                    done()
                })
        })
    })
    // Get all Books in DB
    describe('GetAllBooks', function() {
        it('GetAllBooks should return an array of books', (done) => {
            chai.request(server)
                // May have to change name because we haven't named it yet
                .get('/api/book/getAll')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.should.be.greaterThan(0)
                    done()
                })
        })
    })
    // Get one Book
    describe('GetOneBook', function() {
        it('GetOneBook should return a single book', (done) => {
            // We'll need to be a known id here
            const id = 1
            chai.request(server)
                // May have to change name because we haven't named it yet
                .get(`/api/book/get=?${id}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    res.body.should.have.property('title')
                    res.body.should.have.property('writingPrompt')
                    res.body.should.have.property('image')
                    res.body.should.have.property('numberOfChapters')
                    res.body.should.have.property('duration')
                    res.body.should.have.property('authorArray')
                    res.body.should.have.property('inProgressFlag')
                    res.body.should.have.property('expriationDate')
                    res.body.title.should.be.a('string')
                    res.body.writingPrompt.should.be.a('string')
                    res.body.image.should.be.a('string')
                    res.body.numberOfChapters.should.be.a('number')
                    res.body.duration.should.be.a('number')
                    res.body.authorArray.should.be.a('array')
                    res.body.inProgressFlag.should.be.a('boolean')
                    res.body.expirationDate.should.be.a('date')
                    done()
                })
        })

        it('GetOneBook should not get a book if it does not exist', (done) => {
            // We'll need to be a known id here that isn't there
            const id = 0
            chai.request(server)
                .get(`/api/book/get=?${id}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })
        })
    })
    // Edit a Book
    describe('EditBook', function() {
        it('EditBook should update a book', (done) => {
            //Should be a known id
            const id = 1
            //Test Book
            const testBook = {
                title: "Test Title1",
                writingPrompt: "Test Prompt1",
                image: "https://d2ph5fj80uercy.cloudfront.net/06/cat1996.jpg",
                numberOfChapters: 2,
                duration: new Date() + 11 * 1000
            }
            chai.request(server)
            // May have to change name because we haven't named it yet
            .post(`/api/book/edit?=${id}`)
            .send(testBook)
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
        })
    })
    // Add Chapter to Book
    describe('AddChapter', function() {
        testChapter.should.have.property('title')
        testChapter.should.have.property('text')
        testChapter.should.have.property('author')
        it('AddChapter should add a chapter to a book', (done) => {
            chai.request(server)
            // May have to change name because we haven't named it yet
            .post(`/api/book/addChapter`)
            .send(testChapter)
            .end((err, res) => {
                res.should.have.status(200)
            })
        })

    })
    // Add Chapter to Contenders
    describe('AddChapterToContenders', function() {
        testChapter.should.have.property('title')
        testChapter.should.have.property('text')
        testChapter.should.have.property('author')
        it('AddChapterToContenders should add a chapter to a books contenders list', (done) => {
            chai.request(server)
            // May have to change name because we haven't named it yet
            .post(`/api/book/addChapterToContenders`)
            .send(testChapter)
            .end((err, res) => {
                res.should.have.status(200)
            })
        })
    })
    // Delete a Book
    describe('DeleteBook', function() {
        it('DeleteBook should delete a book', (done) => {
            //Should be a known id
            const id = 1
            chai.request(server)
                // May have to change name because we haven't named it yet
                .delete(`/api/book/delete=?${id}`)
                .end((err, res) => {
                    res.should.have.status(200)
                    done()
                })
        })

        it('DeleteBook should not delete a book that does not exist', (done) => {
            //Should be a known id
            const id = 0
            chai.request(server)
                // May have to change name because we haven't named it yet
                .delete(`/api/book/delete?=${id}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    done()
                })
        })
    })
})