// models/prescription.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PrescriptionSchema   = new Schema({
    expirationDate: Date,
    medicine: String,
    presentation: String
});

module.exports = mongoose.model('Prescription', PrescriptionSchema);
