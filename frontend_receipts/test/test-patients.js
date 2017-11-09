// /test/test-patient.js
process.env.NODE_ENV = 'test';

var chai            = require('chai');
var chaiHttp        = require('chai-http');
var mongoose        = require("mongoose");
mongoose.Promise    = require('bluebird');
var Promise         = require('bluebird');

var server          = require('../app');
var MedicalReciept  = require('../models/medicalReceipt');
var mockObjects     = require('./mock-objects');

var patientID       = '5a0170f4bd900e96b89a5d9c';

var should = chai.should();
var assert = chai.assert;
chai.use(chaiHttp);

describe('TESTING: route [patients]', function () {

    var myToken;

    beforeEach(function (done) {
        var auth = new Promise(resolve =>{
            chai.request(server)
                .post('/api/authenticate')
                .send({ name: 'patient1', password: 'passwd' })
                .end(function(err, res){
                    resolve(res.body.token);
                })
        });
        Promise.join(
            auth,
            mockObjects.medicalReceipt_1,
            mockObjects.medicalReceipt_2,
            function(token) {
                myToken = token;
                done();
            })
    });
    afterEach(function (done) {
        MedicalReciept.collection.drop().catch(() => { });
        done();
    });

    /******************* TESTS *******************/

    // GET /api/Patients/{id}/Prescriptions/tofill/{?data}
    it('GET api/Patients/{id}/Prescriptions/tofill/?date= [should list 1 object]', 
    function (done) {
        chai.request(server)
            .get('/api/patients/'+ patientID +'/prescriptions/tofill' + "?date=2018-02-28")
            .set('x-access-token', myToken)
            .end(function (err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.lengthOf(1);
                res.body[0].should.have.property('expirationDate');
                res.body[0].should.have.property('fills');
                res.body[0].fills.should.be.a('array');
                assert.lengthOf(res.body[0].fills, 0);
                res.body[0].should.have.property('drug');
                res.body[0].should.have.property('presentation');
                res.body[0].should.have.property('prescribedPosology');
                res.body[0].drug.should.equal('Abacavir');
                res.body[0].presentation.form.should.equal('xarope');
                done();
            });
    });
    // GET /api/Patients/{id}/Prescriptions/tofill/{?data}
    it('GET api/Patients/{id}/Prescriptions/tofill/?date= [should list 0 object]',
        function (done) {
            chai.request(server)
                .get('/api/patients/' + patientID + '/prescriptions/tofill' + "?date=2017-12-25")
                .set('x-access-token', myToken)
                .end(function (err, res) {
                    res.should.have.status(404);
                    res.should.be.json;
                    res.body.should.have.property('message');
                    res.body.message.should.equal('Prescriptions not found with then given criterias.');
                    done();
                });
        });
});