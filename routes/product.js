
const { Router } = require('express');

const { getProducts } = require('../controllers/product');

const router = Router();

router.get('/', getProducts);

module.exports = router;