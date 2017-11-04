// models/medicalReceipt.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PresentationSchema = new Schema({
    form: String,
    concentration: Number,
    quantity: Number
});
var FillSchema = new Schema({
    date: Date,
    quantity: Number
});
var PrescribedPosologySchema = new Schema({
    quantity: String,
    Technique: String,
    Interval: String,
    Period: String
});
var PrescriptionSchema = new Schema({
    expirationDate: Date,
    drug: String,
    medicine: String,
    prescribedPosology: PrescribedPosologySchema,
    presentation: PresentationSchema,
    fills: [ FillSchema ]
});
var MedicalReceiptSchema = new Schema({
    pyshician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    creationDate: Date,
    prescriptions: [ PrescriptionSchema ]
});

module.exports = mongoose.model('MedicalReceipt', MedicalReceiptSchema);