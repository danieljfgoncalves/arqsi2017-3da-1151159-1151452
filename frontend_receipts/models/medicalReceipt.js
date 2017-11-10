// models/medicalReceipt.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var defaultExpirationDate = new Date();
defaultExpirationDate.setDate(defaultExpirationDate.getDate() + 30);

var PresentationSchema = new Schema({
    form: String,
    concentration: Number,
    quantity: Number
});
var FillSchema = new Schema({
    date: { type: Date, default: Date.now },
    quantity: Number
});
var PrescribedPosologySchema = new Schema({
    quantity: String,
    technique: String,
    interval: String,
    period: String
});
var PrescriptionSchema = new Schema({
    expirationDate: { type: Date, default: defaultExpirationDate },
    drug: String,
    medicine: String,
    prescribedPosology: PrescribedPosologySchema,
    presentation: PresentationSchema,
    quantity: { type: Number, required: 'Quantity is required', min: 1 },
    fills: [ FillSchema ]
});
var MedicalReceiptSchema = new Schema({
    physician: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    creationDate: { type: Date, default: Date.now },
    prescriptions: [ PrescriptionSchema ]
});

module.exports = mongoose.model('MedicalReceipt', MedicalReceiptSchema);