const express = require('express');
const router = express.Router();
const AIController = require('../controllers/ai.controller');

// router.post('/search', AIController.searchFoodByMood);
// router.post('/recommendFood', AIController.recommendFood);
router.post("/ai/fashion-recommend", AIController.searchFashionItems);


module.exports = router;
