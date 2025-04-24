// routes/fashionRoutes.js
const express = require('express');
const router = express.Router();
const fashionController = require('../controllers/fashionController');

router.post('/fashion-advice', fashionController.getFashionAdvice);
router.get('/fashion-items', fashionController.getFashionItems);
router.get('/fashion-items/:id', fashionController.getFashionItemById);

module.exports = router;
