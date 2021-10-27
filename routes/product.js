const { Router } = require('express');

const { getProducts, editProduct,  deleteProduct} = require('../controllers/product');

const router = Router();

router.get('/', getProducts);
router.put('/', editProduct);
router.delete('/', deleteProduct);

module.exports = router;