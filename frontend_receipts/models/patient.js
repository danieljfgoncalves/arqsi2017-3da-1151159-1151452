// models/physician.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PatientSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Physician', PatientSchema);