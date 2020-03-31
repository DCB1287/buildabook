
//switch node to test?
process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let Chapter = require('../models/chapter.model')

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

//Test data
const data = require('./testDataChapter')
testBook = data.testBook
testChapterCorrect = data.testChapterCorrect
testChapterWrong = data.testChapterWrong


//Config Chai
chai.use(chaiHttp)
//address of local host server
const server = 'http://localhost:3000'


//Chapter Tests
describe('ChapterAPI', (done) => {
    //This will dump the contents of the chapter collection
    //Remove each Book before each test
    beforeEach((done) => {
        Chapter.remove({}, (err) => {
            done()
        })
    })

    
    //Get all Chapters 
    describe('GetAllChapters', function() {
        it('should return an empty array of chapters', (done) => {
            chai.request(server)
                //May have to change name because we haven't named it yet
                .get('/api/chapter/getAll')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.should.be.eql(0)
                    done()
                })
        })
    })  
     

    // Add Chapter to Book
    describe('AddChapter', function() {
        it('should add a chapter to a book', (done) => {
            chai.request(server)
            // May have to change name because we haven't named it yet
            .post(`/api/chapter/addChapterToBook`)
            .send(testChapterCorrect)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('string')
            })
        })

        it('should not add a chapter if it does not have a bookID, title, text, author', (done) => {
            chai.request(server)
            // May have to change name because we haven't named it yet
            .post(`/api/chapter/addChapterToBook`)
            .send(testChapterWrong)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('string')
            })
        })

    })
    // Add Chapter to Contenders
    describe('AddChapterToContenders', function() {
        it('should add a chapter to a chapters contenders list', (done) => {
            chai.request(server)
                // May have to change name because we haven't named it yet
                .post(`/api/chapter/addChapterToContenders`)
                .send(testChapterCorrect)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('object')
                    done()
                })
        })

        it('should not add a chapter if it does not have a ChapterID, title, text, author ', (done) => {
            chai.request(server)
                // May have to change name because we haven't named it yet
                .post(`/api/chapter/addChapterToContenders`)
                .send(testChapterWrong)
                .end((err, res) => {
                    res.should.have.status(400)
                    res.body.should.be.a('string')
                    done()
                })
        })
    })

    describe('GetChapter', function() {
        it('should get a chapter based on ID', (done) => {
            let chapter = new Chapter(testChapterCorrect)
            chapter.save((err, chapter) => {
                chai.request(server)
                    // May have to change name because we haven't named it yet
                    .get(`/api/chapter/addChapterToContenders?=${chapter._id}`)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.should.be.a('object')
                        res.should.have.property('body')
                        res.body.should.be.a('object')
                        res.body.should.have.property('title')
                        res.body.should.have.property('text')
                        res.body.should.have.property('author')
                        res.body.should.have.property('expirationDate')
                        done()
                    })
            })
        })
        it('should fail if it does not have a valid id', (done) => {
            chai.request(server)
            // May have to change name because we haven't named it yet
            .get(`/api/chapter/addChapterToContenders?=0`)
            .end((err, res) => {
                res.should.have.status(404)
                res.body.should.be.a('string')
                done()
            })
        })
    })
})