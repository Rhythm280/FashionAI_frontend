const express = require('express');
const router = express.Router();
const fashionController = require('../controllers/fashionController');  // Make sure path is correct

// Route to create a new fashion item
router.post('/', fashionController.createFashionItem);

// Route to get all fashion items
router.get('/', fashionController.getAllFashionItems);

module.exports = router;
