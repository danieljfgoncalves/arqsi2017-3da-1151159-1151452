// controllers/medicalReceiptController.js

var roles = require('../models/roles');
var MedicalReceipt = require('../models/medicalReceipt');
var config = require('../config');
var nodeRestClient = require('node-rest-client');
var async = require('async');
var medicinesClient = require('../helpers/medicinesRequests');
var Promise = require('bluebird');


// TODO: Review all roles as for requistes table.

// GET /api/medicalReceipts
exports.get_medical_receipts_list = function(req, res) {
    
    if (req.roles.includes(roles.Role.ADMIN)) {
        
        MedicalReceipt.find(function(err, medicalReceipts) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(medicalReceipts);
        });
    } else if (req.roles.includes(roles.Role.PHYSICIAN) || 
               req.roles.includes(roles.Role.PATIENT)) {

        var query;
        if (req.roles.includes(roles.Role.PHYSICIAN)) {
            query = {"physician":req.userID}
        } else {
            query = { "patient": req.userID }
        }
        MedicalReceipt.find(query,function (err, medicalReceipts) {
            if (err) {
                res.status(500).send(err);
            }
            res.status(200).json(medicalReceipts);
        });
    } else {
        res.status(401).send('Unauthorized User.');
    }
};

// GET /api/medicalReceipts/{id}
exports.get_medical_receipt = function(req, res) {

    MedicalReceipt.findById(req.params.id, function(err, medicalReceipt) {
        if (err) {
            res.send(err);
        }

        if (req.roles.includes(roles.Role.ADMIN) ||
            req.roles.includes(roles.Role.PHARMACIST ||
            (req.roles.includes(roles.Role.PATIENT) && req.userID == medicalReceipt.patient) ||
            (req.roles.includes(roles.Role.PHYSICIAN) && req.userID == medicalReceipt.physician) )) {

            res.status(200).json(medicalReceipt);
        } else {
            res.status(401).send('Unauthorized User.');
        }
    });
};

// POST /api/medicalReceipts
exports.post_medical_receipt = function(req, res) {

    if ( !( req.roles.includes(roles.Role.ADMIN) || 
            req.roles.includes(roles.Role.PHYSICIAN) ) ) {
        res.status(401).send('Unauthorized User.');
        return;
    }

    var medicalReceipt = new MedicalReceipt();

    var cdate = new Date();
    if (req.body.creationDate) cdate = req.body.creationDate;

    medicalReceipt.creationDate = cdate;
    medicalReceipt.pyshician = req.userID;
    medicalReceipt.patient = req.body.patient;

    async.each(
        req.body.prescriptions,
        
        (item, callback) => {

            var args = {
                data: { "Email": config.medicines_backend.email, "Password": config.medicines_backend.secret },
                headers: { "Authorization": "Bearer ".concat(req.token), "Content-Type": "application/json" }
            };

            Promise.join(
                medicinesClient.getDrug(args, item.drug),
                medicinesClient.getMedicine(args, item.medicine),
                medicinesClient.getPresentation(args, item.presentation),
                medicinesClient.getPosology(args, item.posology),
                function (drug, medicine, presentation, posology) {

                    var prescription = {
                        "expirationDate": item.expirationDate,
                        "drug": drug.name,
                        "medicine": medicine.name,
                        "prescribedPosology": {
                            "quantity": posology.quantity,
                            "technique": posology.technique,
                            "interval": posology.interval,
                            "period": posology.period
                        },
                        "presentation": {
                            "form": presentation.form,
                            "concentration": presentation.concentration,
                            "quantity": presentation.quantity
                        }
                    };
                    medicalReceipt.prescriptions.push(prescription);
                    callback();
                })
        },
        (error) => {
            // save the medical receipt and check for errors
            medicalReceipt.save( err => {
                if (err) {
                    res.send(err);
                }
                res.json({ message: 'Medical Receipt Created!' });
            });
        });
};

// PUT /api/medicalReceipts/{id}
exports.put_medical_receipt = function (req, res) {

    if  (req.roles.includes(roles.Role.ADMIN) ||
        req.roles.includes(roles.Role.PHYSICIAN)) {
        res.status(401).send('Unauthorized User.');
        return;
    }

    var cdate = new Date();
    if (req.body.creationDate) cdate = req.body.creationDate;

    var newPrescriptions = [];
    async.each(
        req.body.prescriptions,

        (item, callback) => {

            var args = {
                data: { "Email": config.medicines_backend.email, "Password": config.medicines_backend.secret },
                headers: { "Authorization": "Bearer ".concat(req.token), "Content-Type": "application/json" }
            };

            Promise.join(
                medicinesClient.getDrug(args, item.drug),
                medicinesClient.getMedicine(args, item.medicine),
                medicinesClient.getPresentation(args, item.presentation),
                medicinesClient.getPosology(args, item.posology),
                function (drug, medicine, presentation, posology) {

                    var prescription = {
                        "expirationDate": item.expirationDate,
                        "drug": drug.name,
                        "medicine": medicine.name,
                        "prescribedPosology": {
                            "quantity": posology.quantity,
                            "technique": posology.technique,
                            "interval": posology.interval,
                            "period": posology.period
                        },
                        "presentation": {
                            "form": presentation.form,
                            "concentration": presentation.concentration,
                            "quantity": presentation.quantity
                        }
                    };
                    newPrescriptions.push(prescription);
                    callback();
                })
        },
        (error) => {
            if (req.roles.includes(roles.Role.PHYSICIAN)) {
                MedicalReceipt.findById(req.params.id, function (err, medicalReceipt) {
                    if (err) {
                        res.status(500).send(err);
                    }
                    if (req.userID != medicalReceipt.physician) {
                        res.status(401).send('Unauthorized User.');
                        return;
                    }
                });
            }
            // update the medical receipt and check for errors
            MedicalReceipt.findOneAndUpdate({ _id: req.params.id }, {
                pyshician: req.userID,
                patient: req.body.patient,
                creationDate: cdate,
                prescriptions: newPrescriptions
            }, err => {

                if (err) {
                    res.status(500).send(err);
                }
                res.status(200).send('Medical Receipt Updated!');
            });
        });
}

// DELETE /api/medicalReceipts/{id}
exports.delete_medical_receipt = function(req, res) {

    if (!req.roles.includes(roles.Role.ADMIN)) {
        res.status(401).send('Unauthorized User.');
        return;
    }

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
            req.roles.includes(roles.Role.PHARMACIST ||
            (req.roles.includes(roles.Role.PATIENT) && req.userID == medicalReceipt.patient) ||
            (req.roles.includes(roles.Role.PHYSICIAN) && req.userID == medicalReceipt.physician))) {

            res.status(200).json(medicalReceipt.prescriptions);
        } else {
            res.status(401).send('Unauthorized User.');
        }
    });
}

// POST /api/MedicalReceipts/{id1}/Prescriptions/{id2}/Fills
exports.post_fill_prescription = (req, res) => {
    if ( !( req.roles.includes(roles.Role.ADMIN) || 
        req.roles.includes(roles.Role.PHARMACIST) ) ) {

        res.status(401).send('Unauthorized User.');
        return;
    }
    MedicalReceipt.findById(req.params.id1, (err, medicalReceipt) => {
        if (err) {
            res.send(err);
            return;
        }

        var prescription = medicalReceipt._doc.prescriptions.find(e => e._id == req.params.id2);
        if (!prescription) {
            res.status(404).send("The prescription doesn't exists.");
            return;
        }

        var availableFills = prescription._doc.presentation.quantity;
        prescription._doc.fills.forEach(element => {
            availableFills -= element.quantity;
        });

        if (req.body.quantity > availableFills) {
            res.status(400).send("The quantity is bigger than the available [Remaining: " + availableFills + "].");
            return;
        }

        prescription._doc.fills.push(req.body);
        medicalReceipt.save(function (err) {
            if (err) {
                res.send(err);
            }
            res.json({ message: 'Medical Receipt Updated!' });
        });
    });
}

// POST /api/medicalReceipts/{id1}/Prescriptions/
exports.post_prescription = function (req, res) {

    if (!(req.roles.includes(roles.Role.ADMIN) ||
        req.roles.includes(roles.Role.PHYSICIAN))) 
    {
        res.status(401).send('Unauthorized User.');
        return;
    }
    MedicalReceipt.findById(req.params.id, function (err, medicalReceipt) {
        if (err) {
            res.send(err);
        }

        var args = {
            data: { "Email": config.medicines_backend.email, "Password": config.medicines_backend.secret },
            headers: { "Authorization": "Bearer ".concat(req.token), "Content-Type": "application/json" }
        };

        Promise.join(
            medicinesClient.getDrug(args, req.body.drug),
            medicinesClient.getMedicine(args, req.body.medicine),
            medicinesClient.getPresentation(args, req.body.presentation),
            medicinesClient.getPosology(args, req.body.posology),
            function(drug, medicine, presentation, posology) {

                var prescription = {
                    "expirationDate": req.body.expirationDate,
                    "drug": drug.name,
                    "medicine": medicine.name,
                    "prescribedPosology": {
                        "quantity": posology.quantity,
                        "technique": posology.technique,
                        "interval": posology.interval,
                        "period": posology.period
                    },
                    "presentation": {
                        "form": presentation.form,
                        "concentration": presentation.concentration,
                        "quantity": presentation.quantity
                    }
                };
                medicalReceipt.prescriptions.push(prescription);
                // save the medical receipt and check for errors
                medicalReceipt.save(err => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.status(201).json({ message: 'Prescription Created & Added to Medical Receipt!' });
                });
            })
    });

} 

// GET /api/medicalReceipts/{id}/Prescriptions/{id}
exports.get_prescription_by_id = function (req, res) {

    MedicalReceipt.findById(req.params.receiptId, function (err, medicalReceipt) {
        if (err) {
            res.status(500).send(err);
        }

        if (req.roles.includes(roles.Role.ADMIN) ||
            req.roles.includes(roles.Role.PHARMACIST ||
            (req.roles.includes(roles.Role.PATIENT) && req.userID == medicalReceipt.patient) ||
            (req.roles.includes(roles.Role.PHYSICIAN) && req.userID == medicalReceipt.physician))) {

            var prescription = medicalReceipt.prescriptions.id(req.params.prescId);

            if (!prescription) {
                res.status(404).send("The prescription doesn't exists.");
                return;
            }

            res.status(200).json(prescription);
        } else {
            res.status(401).send('Unauthorized User.');
        }
    });
}

// // PUT /api/medicalReceipts/{id}/Prescriptions/{id}
exports.put_prescription_by_id = function (req, res) {

    MedicalReceipt.findById(req.params.receiptId, function (err, medicalReceipt) {
        if (err) {
            res.status(500).send(err);
        }

        if (req.roles.includes(roles.Role.ADMIN) ||
            (req.roles.includes(roles.Role.PHYSICIAN) && req.userID == medicalReceipt.physician)) {

            var prescription = medicalReceipt.prescriptions.id(req.params.prescId);

            if (!prescription) {
                res.status(404).send("The prescription doesn't exists.");
                return;
            } else if(prescription.fills.length > 0) {
                res.status(401).send('The prescription has been filled & can\'t be changed');
                return;
            }

            var args = {
                data: { "Email": config.medicines_backend.email, "Password": config.medicines_backend.secret },
                headers: { "Authorization": "Bearer ".concat(req.token), "Content-Type": "application/json" }
            };

            Promise.join(
                medicinesClient.getDrug(args, req.body.drug),
                medicinesClient.getMedicine(args, req.body.medicine),
                medicinesClient.getPresentation(args, req.body.presentation),
                medicinesClient.getPosology(args, req.body.posology),
                function (drug, medicine, presentation, posology) {

                    if (req.body.expirationDate) prescription.expirationDate = req.body.expirationDate;
                    if (drug) prescription.drug = drug.name;
                    if (medicine) {
                        prescription.medicine = medicine.name;
                    } else {
                        prescription.medicine = undefined;
                    }
                    if (posology) {
                        prescription.prescribedPosology = {
                            "quantity": posology.quantity,
                            "technique": posology.technique,
                            "interval": posology.interval,
                            "period": posology.period
                        }
                    }
                    if (presentation) {
                        prescription.presentation = {
                            "form": presentation.form,
                            "concentration": presentation.concentration,
                            "quantity": presentation.quantity
                        }
                    }

                    // // // Update prescription
                    prescription.save(err => {
                        if (err) res.status(500).send(err);
                    });
                    // update the medical receipt and check for errors
                    medicalReceipt.save( err => {
                        if (err) res.status(500).send(err);

                        res.status(200).json({ message: 'Prescription was updated!' });
                    });
                })

        } else {
            res.status(401).send('Unauthorized User.');
        }
    });
}