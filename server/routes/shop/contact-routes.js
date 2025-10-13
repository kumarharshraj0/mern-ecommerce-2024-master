const express = require('express');
const router = express.Router();
const contactController = require('../../controllers/shop/contact-controller');

router.post('/contact', contactController.submitContactForm);

module.exports = router;