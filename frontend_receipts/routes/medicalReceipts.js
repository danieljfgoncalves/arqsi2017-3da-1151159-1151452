// routes/medicalReceipts.js

var express     = require('express');
var router      = express.Router();
var middlewares = require('../middleware');

// Require controller modules
var medical_receipts_controller = require('../controllers/medicalReceiptController');

// Add Authentication middleware
router.use('/medicalReceipts', middlewares.authenticateToken);

// GET /app/medical_receipts
router.get('/medicalReceipts', medical_receipts_controller.get_medical_receipts_list);

// GET /app/medical_receipts/<id>
router.get('/medicalReceipts/:id', medical_receipts_controller.get_medical_receipt);

// POST /app/medicalReceipts
router.post('/medicalReceipts', medical_receipts_controller.post_medical_receipt);

// PUT /app/medical_receipts/<id>
router.put('/medicalReceipts/:id', medical_receipts_controller.put_medical_receipt);

// DELETE /app/medical_receipts/<id>
router.delete('/medicalReceipts/:id', medical_receipts_controller.delete_medical_receipt);


module.exports = router;