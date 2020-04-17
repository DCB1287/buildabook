
//switch node to test?
process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let Chapter = require('../models/chapter.model')
let Book = require('../models/book.model')


let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

//Test data
const data = require('./testDataChapter')
testBook = data.testBook
testChapterCorrect = data.testChapterCorrect
testChapterCorrect2 = data.testChapterCorrect2
testChapterWrong = data.testChapterWrong


//Config Chai
chai.use(chaiHttp)
//address of local host server
let server = require('../server')


//Chapter Tests
describe('ChapterAPI', (done) => {
    //This will dump the contents of the chapter collection
    //Remove each Book before each test
    beforeEach((done) => {
        Chapter.remove({}, (err) => {
        })

        Book.remove({}, (err) => {
        })
        done()
    })

    
    //Get all Chapters 
    describe('Get all chapters', function() {
        it('should return an empty array of chapters', (done) => {
            chai.request(server)
                //May have to change name because we haven't named it yet
                .get('/api/chapter/getAll')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.should.be.empty
                    done()
                })
        })
    })  
     

    // Add Chapter to Book
    describe('Add a contender', function() {
        it('should add a contender to a chapter', (done) => {
            
            async function test() {

                const theDate = new Date();
                const targetChapter = new Chapter({
                    _id: "5e97f48f97a32a1e68dfa699",
                    title: 'test',
                    text: 'test text',
                    author: '1',
                    expirationDate: theDate,
                    startDate: theDate,
                    comments: [],
                    dateCreated: theDate,
                    contenders: []
                });

                await Chapter.create(targetChapter);

                const contender = {
                    title: 'test',
                    text: 'test text',
                    author: '1',
                    chapter: "5e97f48f97a32a1e68dfa699",
                };

                chai.request(server)
                // May have to change name because we haven't named it yet
                .post(`/api/chapter/addContender`)
                .send(contender)
                .end((err, res) => {
                    //console.log(res.body)
                    res.should.have.status(200)
                    res.body.should.be.a('Object')
                    res.body.should.have.property("message").eql("Contender added!")
                    done();
                })
            }

            test();
        })

        it('should not add a contender if it does not have a title', (done) => {
            
            
            async function test() {

                const theDate = new Date();
                const targetChapter = new Chapter({
                    _id: "5e97f48f97a32a1e68dfa699",
                    title: 'test',
                    text: 'test text',
                    author: '1',
                    expirationDate: theDate,
                    startDate: theDate,
                    comments: [],
                    dateCreated: theDate,
                    contenders: []
                });

                await Chapter.create(targetChapter);

                const contender = {
                    //title: 'test',
                    text: 'test text',
                    author: '1',
                    chapter: "5e97f48f97a32a1e68dfa699",
                };

                chai.request(server)
                // May have to change name because we haven't named it yet
                .post(`/api/chapter/addContender`)
                .send(contender)
                .end((err, res) => {
                    //console.log(res.body)
                    res.should.have.status(400)
                    res.body.should.be.a('string')
                    done();
                })
            }

            test();
        })
        
        it('should not add a contender if it does not have a text', (done) => {
            
            
            async function test() {

                const theDate = new Date();
                const targetChapter = new Chapter({
                    _id: "5e97f48f97a32a1e68dfa699",
                    title: 'test',
                    text: 'test text',
                    author: '1',
                    expirationDate: theDate,
                    startDate: theDate,
                    comments: [],
                    dateCreated: theDate,
                    contenders: []
                });

                await Chapter.create(targetChapter);

                const contender = {
                    title: 'test',
                    //text: 'test text',
                    author: '1',
                    chapter: "5e97f48f97a32a1e68dfa699",
                };

                chai.request(server)
                // May have to change name because we haven't named it yet
                .post(`/api/chapter/addContender`)
                .send(contender)
                .end((err, res) => {
                    //console.log(res.body)
                    res.should.have.status(400)
                    res.body.should.be.a('string')
                    done();
                })
            }

            test();
        })

        it('should not add a contender if it does not have an author', (done) => {
            
            
            async function test() {

                const theDate = new Date();
                const targetChapter = new Chapter({
                    _id: "5e97f48f97a32a1e68dfa699",
                    title: 'test',
                    text: 'test text',
                    author: '1',
                    expirationDate: theDate,
                    startDate: theDate,
                    comments: [],
                    dateCreated: theDate,
                    contenders: []
                });

                await Chapter.create(targetChapter);

                const contender = {
                    title: 'test',
                    text: 'test text',
                    //author: '1',
                    chapter: "5e97f48f97a32a1e68dfa699",
                };

                chai.request(server)
                // May have to change name because we haven't named it yet
                .post(`/api/chapter/addContender`)
                .send(contender)
                .end((err, res) => {
                    //console.log(res.body)
                    res.should.have.status(400)
                    res.body.should.be.a('string')
                    done();
                })
            }

            test();
        })

    })
   
    describe('getById', function() {
        it('should get a chapter based on ID', (done) => {

            async function test(){
                await Chapter.create(testChapterCorrect)
                await Chapter.create(testChapterCorrect2)

                chai.request(server)
                // May have to change name because we haven't named it yet
                .get('/api/chapter/getById?chapters=5e97f48f97a32a1e68dfa6f2&chapters=5e97f48f97a32a1e68dfa6f3')
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200)
                    res.should.have.property('body')
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(2)
                    done()
                })
            }

            test();

        })
        it('should return empty array', (done) => {
            async function test(){
                chai.request(server)
                // May have to change name because we haven't named it yet
                .get(`/api/chapter/getById?chapters=5e98f9b94c9ba3e061052096`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.should.be.empty
                    done()
                })
            }

            test()
        })
    })


    describe('getByAuthor', function() {
        it('should get a chapter based on ID', (done) => {

            async function test(){
                await Chapter.create(testChapterCorrect)
                await Chapter.create(testChapterCorrect2)

                chai.request(server)
                // May have to change name because we haven't named it yet
                .get('/api/chapter/getByAuthor?author=1')
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200)
                    res.should.have.property('body')
                    res.body.should.be.a('array')
                    res.body.length.should.be.eql(1)
                    res.body[0].should.have.property('author').eql('1')
                    done()
                })
            }

            test();

        })
        it('should return empty array', (done) => {
            async function test(){
                chai.request(server)
                // May have to change name because we haven't named it yet
                .get(`/api/chapter/getByAuthor?author=5e98f9b94c9ba3e061052096`)
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.should.be.empty
                    done()
                })
            }

            test()
        })
    })


})