// routes/medicalReceipts.js

var express     = require('express');
var router      = express.Router();
var middlewares = require('../middleware');

// Require controller modules
var medical_receipts_controller = require('../controllers/medicalReceiptController');

// Add Authentication middleware
router.use('/medicalReceipts', middlewares.authenticateToken);

// GET /api/medical_receipts
router.get('/medicalReceipts', medical_receipts_controller.get_medical_receipts_list);

// GET /api/medical_receipts/<id>
router.get('/medicalReceipts/:id', medical_receipts_controller.get_medical_receipt);

// POST /app/medicalReceipts
router.post('/medicalReceipts', middlewares.authenticateToMedicinesBackend, medical_receipts_controller.post_medical_receipt);

// PUT /api/medical_receipts/<id>
router.put('/medicalReceipts/:id', medical_receipts_controller.put_medical_receipt);

// DELETE /api/medical_receipts/<id>
router.delete('/medicalReceipts/:id', medical_receipts_controller.delete_medical_receipt);

// GET /api/MedicalReceipts/{id}/Prescriptions
router.get('/medicalReceipts/:id/prescriptions', medical_receipts_controller.get_prescriptions_by_id);

// POST /api/MedicalReceipts/{id1}/Prescriptions/{id2}/Fills
router.post('/medicalReceipts/:id1/prescriptions/:id2/fills', medical_receipts_controller.post_fill_prescription);

// PUT /api/MedicalReceipts/{id1}/Prescriptions/{id2}/Fills
router.put('/medicalReceipts/:id1/prescriptions/:id2/fills', medical_receipts_controller.post_fill_prescription);


module.exports = router;