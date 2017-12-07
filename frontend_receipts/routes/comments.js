// routes/comments.js

var express     = require('express');
var router      = express.Router();
var middlewares = require('../middleware');

// Require controller modules
var comments_controller = require('../controllers/commentController');

// Add Authentication middleware
router.use('/comments', middlewares.authenticateToken);

// GET /api/comments
router.get('/comments', comments_controller.get_comments);

// GET /api/comments/{id}
router.get('/comments/:id', comments_controller.get_comment);

// POST /api/comments
router.post('/comments', comments_controller.post_comment);

// PUT /api/comments/{id}
router.put('/comments/:id', comments_controller.put_comment);

// DELETE /api/comments/{id}
router.delete('/comments/:id', comments_controller.delete_comment);

module.exports = router;