// models/medicalReceipt.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var MedicalReceiptSchema   = new Schema({
    creationDate: Date
});

module.exports = mongoose.model('MedicalReceipt', MedicalReceiptSchema);