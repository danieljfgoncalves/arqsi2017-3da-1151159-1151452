// controllers/patientController.js

var roles = require('../models/roles');
var MedicalReceipt = require('../models/medicalReceipt');

// GET /api/Patient/{id}/Prescriptions/tofill/{?data} 
exports.get_prescriptions_to_fill_until_date = (req, res) => {
    if ( !( req.roles.includes(roles.Role.ADMIN) || 
            (req.roles.includes(roles.Role.PATIENT ) && req.userID == req.params.id) ) ) {

        res.status(401).send('Unauthorized User.');
        return;
    }

    MedicalReceipt.find({"patient":req.params.id}, (err, docs) => {
        if (!docs) {
            res.status(404).json({"message":"Medical Receipts Not Found"});
            return;
        }
        if (err) {
            res.status(500).send(err);
            return;
        }

        var prescriptions = [];

        docs.forEach( mr => {
            mr._doc.prescriptions.forEach( p => {
                var availableFills = p._doc.presentation.quantity;
                p._doc.fills.forEach( element => {
                    availableFills -= element.quantity;
                });
                if (availableFills <= 0) {
                    return;
                }

                var dateFilter = new Date(req.query.date);
                if ((!dateFilter) || (p._doc.expirationDate < dateFilter)) {
                    prescriptions.push(p);
                }
            });
        });

        if (prescriptions.length <= 0) {
            res.status(404).json({
                "message":"Prescriptions not found with then given criterias."
            });
            return;
        }
        res.status(200).json(prescriptions);
    });
};