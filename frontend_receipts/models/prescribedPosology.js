// models/prescribedPosology.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PrescribedPosologySchema   = new Schema({
    posology: String
});

module.exports = mongoose.model('PrescribedPosology', PrescribedPosologySchema);
