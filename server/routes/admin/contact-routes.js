const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/admin/contact-controller');
const { protect, authorize } = require('../../middleware/auth'); // Assuming you have auth middleware

router.get('/contact', protect, authorize(['admin']), contactController.getAllContactMessages);

module.exports = router;