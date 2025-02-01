const express = require('express');
const faqController = require('../controllers/faq-controllers');

const router = express.Router();

router.get('/', faqController.getAllFAQs);
router.post('/', faqController.createFAQ);
router.delete('/:id', faqController.deleteFAQ);


module.exports = router;
