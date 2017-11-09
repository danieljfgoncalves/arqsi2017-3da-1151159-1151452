// /test/test-patient.js
process.env.NODE_ENV = 'test';

var chai            = require('chai');
var chaiHttp        = require('chai-http');
var mongoose        = require("mongoose");
mongoose.Promise    = require('bluebird');
var Promise         = require('bluebird');

var server  = require('../app');
var User    = require('../models/user');
var Role    = require('../models/roles');

var should = chai.should();
var assert = chai.assert;
chai.use(chaiHttp);

describe('TESTING: route [authenticate/register]', function () {

    var correctName = "test-physician";

    afterEach(function (done) {
        User.remove({ name: correctName }, function (err) {
            done();
        });
    });

    /******************* TESTS *******************/

    // POST route for registration [should register]
    it('POST api/register [valid request]',
        function (done) {
            chai.request(server)
                .post('/api/register')
                .send({ name: correctName, password: 'passwd', email: "test@email.pt"})
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.html;
                    res.text.should.equal("User [" + correctName + "] registered with success.");
                    done();
                });
        });
    // POST route for registration [should not register]
    it('POST api/register [no name]',
        function (done) {
            chai.request(server)
                .post('/api/register')
                .send({ password: 'passwd', email: "test@email.pt" })
                .end(function (err, res) {
                    res.should.have.status(500);
                    done();
                });
        });
    // POST route for registration [should not register]
    it('POST api/register [invalid email]',
        function (done) {
            chai.request(server)
                .post('/api/register')
                .send({ password: 'passwd', email: "testemail.pt" })
                .end(function (err, res) {
                    res.should.have.status(500);
                    done();
                });
        });
    // POST route for authenticate [should register]
    it('POST api/authenticate [valid authentication]',
        function (done) {
            chai.request(server)
                .post('/api/authenticate')
                .send({ name: "admin", password: 'passwd' })
                .end(function (err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(true);
                    res.body.should.have.property('message');
                    res.body.message.should.be.a("String");
                    res.body.should.have.property('token');
                    res.body.token.should.be.a("String");
                    done();
                });
        });
    // POST route for authenticate [should register]
    it('POST api/authenticate [invalid authentication - wrong name]',
        function (done) {
            chai.request(server)
                .post('/api/authenticate')
                .send({ name: "test", password: 'passwd' })
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('message');
                    res.body.message.should.be.a("String");
                    done();
                });
        });
    // POST route for authenticate [should register]
    it('POST api/authenticate [invalid authentication - wrong password]',
        function (done) {
            chai.request(server)
                .post('/api/authenticate')
                .send({ name: "admin", password: 'wrong' })
                .end(function (err, res) {
                    res.should.have.status(401);
                    res.should.be.json;
                    res.body.should.have.property('success');
                    res.body.success.should.equal(false);
                    res.body.should.have.property('message');
                    res.body.message.should.be.a("String");
                    done();
                });
        });
});