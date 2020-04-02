//switch node to test?
process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let Comment = require('../models/comment.model')

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

//Test data
const data = require('./testDataComment')
testComment = data.testComment
testComment2 = data.testComment2
//Config Chai
chai.use(chaiHttp)
//address of local host server
let server = require('../server')

describe('CommentAPI', function(){
    beforeEach((done) => {
        Comment.remove({}, (err) => {
            done()
        })
    })

    describe('getComment', function() {
        it('should get a comment from a valid id', (done) => {
            let comment = new Comment(testComment)
            comment.save((err, comment) => {
                chai.request(server)
                    .get(`/api/comment/get?=${comment._id}`)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('object')
                        res.body.should.have.property('text')
                        res.body.should.have.property('author')
                        res.body.should.have.property('dateCreated')
                        res.body.should.have.property('upvotes')
                    })
            })
            done()
        })

        it('should not get a comment from an invalid id', (done) => {
            chai.request(server)
                .get(`/api/comment/get?=${comment._id}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('string')
                })
            done()
        })
    })

    describe('EditComment', function() {
        it('should edit a comment from an existing comment', (done) => {
            let comment = new Comment(testComment)
            comment.save((err, comment) => {
                chai.request(server)
                    .post(`/api/comment/edit?=${comment._id}`)
                    .send(testComment2)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('string')
                        let newComment = Comment.find(comment._id)
                        newComment.should.have.property(text)
                        newComment.text.should.eql(testComment2.text)
                        newComment.should.have.property(lastEdit)
                        newComment.lastEdit.should.not.equal(comment.lastEdit)
                    })
            })
            done()
        })
        it('should not edit a comment from a non-existing comment', (done) => {
            chai.request(server)
                .post(`/api/comment/edit?=${0}`)
                .send(testComment2)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.body.should.be.a('string')
                })
            done()
        })
    })
    
})