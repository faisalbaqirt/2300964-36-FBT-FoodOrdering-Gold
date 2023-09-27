const express = require('express');
const router = express.Router();
const Controller = require('../controllers/orderController');

router.post('/order', Controller.createOrder);
router.get('/order', Controller.order);

module.exports = router;