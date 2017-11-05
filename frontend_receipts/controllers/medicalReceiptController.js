// controllers/medicalReceiptController.js
var roles = require('../models/roles');
var MedicalReceipt = require('../models/medicalReceipt');
var nodeRestClient = require('node-rest-client');
var config = require('../config'); // get our config file

// TODO: Authenticate each route according to role permissions.

// GET /api/medicalReceipts
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

// GET /api/medicalReceipts/<id>
exports.get_medical_receipt = function(req, res) {

    MedicalReceipt.findById(req.params.id, function(err, medicalReceipt) {
        if (err) {
            res.send(err);
        }

        if (req.roles.includes(roles.Role.ADMIN) ||
            req.roles.includes(roles.Role.PHYSICIAN) ||
            req.roles.includes(roles.Role.PHARMACIST)) {

            res.status(200).json(medicalReceipt);
        } else if ( req.roles.includes(roles.Role.PATIENT) &&
                    req.userID == medicalReceipt.patient    ) {

            res.status(200).json(medicalReceipt);
        } else {
            res.status(401).send('Unauthorized User.');
        }
    });
};

// POST /api/medicalReceipts
exports.post_medical_receipt = function(req, res) {
    var medicalReceipt = new MedicalReceipt();

    medicalReceipt.creationDate = req.body.creationDate;

    var prescriptionsLength = req.body.prescriptions.length;
    for (var i = 0; i < prescriptionsLength; i++) {
        medicalReceipt.prescriptions.push(req.body.prescriptions[i]);
    }

    // save the medical receipt and check for errors
    medicalReceipt.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Medical Receipt Created!' });
    });
};

// PUT /api/medicalReceipts/<id>
exports.put_medical_receipt = function(req, res) {
    MedicalReceipt.findById(req.params.id, function(err, medicalReceipt) {
        if (err) {
            res.send(err);
        }

        medicalReceipt.creationDate = req.body.creationDate;

        var prescriptionsLength = req.body.prescriptions.length;
        for (var i = 0; i < prescriptionsLength; i++) {
            medicalReceipt.prescriptions.push(req.body.prescriptions[i]);
        }

        // save the medical receipt and check for errors
        medicalReceipt.save(function(err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Medical Receipt Updated!' });
        });
    });
};

// DELETE /api/medicalReceipts/<id>
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

// GET /api/MedicalReceipts/{id}/Prescriptions
exports.get_prescriptions_by_id = function(req, res) {

    MedicalReceipt.findById(req.params.id, function (err, medicalReceipt) {
        if (err) {
            res.send(err);
        }

        if (req.roles.includes(roles.Role.ADMIN) ||
            req.roles.includes(roles.Role.PHYSICIAN) ||
            req.roles.includes(roles.Role.PHARMACIST)) {

            res.status(200).json(medicalReceipt.prescriptions);
        } else if ( req.roles.includes(roles.Role.PATIENT) &&
                    req.userID == medicalReceipt.patient    ) {
            res.status(200).json(medicalReceipt.prescriptions);
        } else {
            res.status(401).send('Unauthorized User.');
        }
    });
}

// POST /api/medicalReceipts/{id1}/Prescriptions/
exports.post_prescription = function(req, res) {

    if ( !( req.roles.includes(roles.Role.ADMIN) ||
        req.roles.includes(roles.Role.PHYSICIAN))) {
        
        res.status(401).send('Unauthorized User.');
        return;
    }

    MedicalReceipt.findById(req.params.id, function (err, medicalReceipt) {
        if (err) {
            res.send(err);
        }

        var client = new nodeRestClient.Client();
        var args = {
            data: { "Email": config.medicines_backend.email, "Password": config.medicines_backend.secret },
            headers: { "Authorization": "Bearer ".concat(req.token), "Content-Type": "application/json" }
        };

        var expirationDate, drug, medicine, quantityPosology, technique,
            interval, period, form, concentration, quantityPresentation;

        expirationDate = req.body.expirationDate;

        new Promise((resolve, reject) => {
            var presentationId = req.body.presentation;
            var url = config.medicines_backend.url.concat("/Presentations/").concat(presentationId);
            client.get(url, args, (data, response) => {
                console.log(data);
                resolve(data);
            });
        })
            .then(presentationObj => {
                form = presentationObj.form;
                concentration = presentationObj.concentration;
                quantityPresentation = presentationObj.quantity;

                var drugId = req.body.drug;
                var url = config.medicines_backend.url.concat("/Drugs/").concat(drugId);
                return new Promise((resolve, reject) => {
                    client.get(url, args, (data, response) => {
                        resolve(data);
                    });
                });
            })
            .then(drugObj => {
                drug = drugObj.name;

                var posologyId = req.body.posology;
                var url = config.medicines_backend.url.concat("/Posologies/").concat(posologyId);
                return new Promise((resolve, reject) => {
                    client.get(url, args, (data, response) => {
                        resolve(data);
                    });
                });
            })
            .then(posologyObj => {
                quantityPosology = posologyObj.quantity;
                technique = posologyObj.technique;
                interval = posologyObj.interval;
                period = posologyObj.period;

                var medicineId = req.body.medicine;
                var url = config.medicines_backend.url.concat("/Medicines/").concat(medicineId);
                return new Promise((resolve, reject) => {
                    client.get(url, args, (data, response) => {
                        resolve(data);
                    });
                });
            })
            .then(medicineObj => {
                medicine = medicineObj.name;

                var prescription = {
                    "expirationDate": expirationDate,
                    "drug": drug,
                    "medicine": medicine,
                    "prescribedPosology": {
                        "quantity": quantityPosology,
                        "technique": technique,
                        "interval": interval,
                        "period": period
                    },
                    "presentation": {
                        "form": form,
                        "concentration": concentration,
                        "quantity": quantityPresentation
                    }
                };
                medicalReceipt.prescriptions.push(prescription);

                medicalReceipt.save(err => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(201).json({ message: 'Prescription Created & Added to Receipt!' });
                });
            });
    });

}        