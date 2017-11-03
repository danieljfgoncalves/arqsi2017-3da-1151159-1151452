// models/physician.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PhysicianSchema = new Schema({
    name : String
});

module.exports = mongoose.model('Physician', PhysicianSchema);