
//switch node to test?
process.env.NODE_ENV = 'test'

let mongoose = require('mongoose')
let User = require('../models/user.model')

let bcrypt = require('bcryptjs');

let chai = require('chai')
let chaiHttp = require('chai-http')
let should = chai.should()

//Test data
const data = require('./testDataUser')
testUserCorrect = data.testUserCorrect
testUserWrong = data.testUserWrong
testEmailValidation = data.testEmailValidation
testNewPassword = data.testNewPassword

//Config Chai
chai.use(chaiHttp)
//address of local host server
const server = 'http://localhost:3000'

describe('UserAPI', function() {
    //This will dump the contents of the user collection
    //Remove each Book before each test
    beforeEach((done) => {
        User.remove({}, (err) => {
            done()
        })
    })
    //Get all Chapters
    describe('GetAllUsers', function() {
        it('should return an array of users', (done) => {
            chai.request(server)
                //May have to change name because we haven't named it yet
                .get('/api/user/getAll')
                .end((err, res) => {
                    res.should.have.status(200)
                    res.body.should.be.a('array')
                    res.body.should.be.equal(0)
                    done()
                })
        })
    })  
    
    describe('getUser', function() {
        it('should get a user with a valid id', (done) => {
            let user = new User(testUserCorrect)
            user.save((err, user) => {
                chai.request(server)
                        //May have to change name because we haven't named it yet
                        .get(`/api/user/get?=${user._id}`)
                        .end((err, res) => {
                            res.should.have.status(200)
                            res.should.be.a('object')
                            res.should.have.property('data')
                            res.data.should.be.a('object')
                            done()
                        })
            })
        })

        it('should not get a user with invalid ID', (done) => {
            chai.request(server)
                //May have to change name because we haven't named it yet
                .get(`/api/user/get?=${0}`)
                .end((err, res) => {
                    res.should.have.status(404)
                    res.should.be.a('string')
                    done()
                })
        })
        
    })
    describe('emailValidation', function() {
        //Not sure how this could be tested
        it('should send an email to the email address provided', (done) => {

            done()
        })

        it('should produce a code which validates a user', (done) => {
            let user = new User(testUserCorrect)
            //How do I get this code?
            user.save((err, user) => {
                chai.request(server)
                    .post(`/api/user/emailValidation`)
                    .send(testEmailValidation)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('string')
                        user = User.find(testUserCorrect.username)
                        user.should.have.property(isVerified)
                        user.isVerified.should.be(true)
                        done()
                    })
            })
        })
    })
    describe('forgotPassword', function() {
         //Not sure how this could be tested
        it('should send an email to the email address provided', (done) => {

            done()
        })

        it('should change the password to the new password specified', (done) => {
            let user = new User(testUserCorrect)
            //How do I get this code?
            user.save((err, user) => {
                chai.request(server)
                    .post(`/api/user/forgotPassword`)
                    .send(testNewPassword)
                    .end((err, res) => {
                        res.should.have.status(200)
                        res.body.should.be.a('string')
                        user = User.find(testUserCorrect.username)
                        user.should.have.property(password)
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(testNewPassword.password, salt, (err, hash) => {
                                user.password.should.equal(hash)
                            })
                        })
                    })
                done()
            })
       })
    })
})