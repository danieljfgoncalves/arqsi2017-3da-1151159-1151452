// controllers/medicalReceiptController.js
var roles = require('../models/roles');
var MedicalReceipt = require('../models/medicalReceipt');

// TODO: Authenticate each route according to role permissions.

// GET /app/medicalReceipts
exports.get_medical_receipts_list = function(req, res) {
    
    if (    req.roles.includes(roles.Role.ADMIN)     || 
            req.roles.includes(roles.Role.PHYSICIAN) || 
            req.roles.includes(roles.Role.PHARMACIST    )) {
        
        MedicalReceipt.find(function(err, medicalReceipts) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(medicalReceipts);
        });
    } else {
        res.status(401).send('Unauthorized User.');
    }
};

// GET /app/medicalReceipts/<id>
exports.get_medical_receipt = function(req, res) {
    MedicalReceipt.findById(req.params.id, function(err, medicalReceipt) {
        if (err) {
            res.send(err);
        }
        res.json(medicalReceipt);
    });
};

// POST /app/medicalReceipts
exports.post_medical_receipt = function(req, res) {
    var medicalReceipt = new MedicalReceipt();
    medicalReceipt.creationDate = req.body.creationDate;

    // save the medical receipt and check for errors
    medicalReceipt.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Medical Receipt Created!' });
    });
};

// PUT /app/medicalReceipts/<id>
exports.put_medical_receipt = function(req, res) {
    MedicalReceipt.findById(req.params.id, function(err, medicalReceipt) {
        if (err) {
            res.send(err);
        }
        medicalReceipt.creationDate = req.body.creationDate;

        // save the medical receipt and check for errors
        medicalReceipt.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Medical Receipt Updated!' });
        });
    });
};

// DELETE /app/medicalReceipts/<id>
exports.delete_medical_receipt = function(req, res) {
    MedicalReceipt.remove({
        _id: req.params.id
    }, function(err, medicalReceipt) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Medical Receipt Deleted' });
    });
}