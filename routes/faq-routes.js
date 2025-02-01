import express from 'express';
import faqController from '../controllers/faq-controllers.js';

const router = express.Router();

router.get('/', faqController.getAllFAQs);
router.post('/', faqController.createFAQ);
router.delete('/:id', faqController.deleteFAQ);


export default router;
