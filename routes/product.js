const { Router } = require('express');

const { getProducts, editProduct,  deleteProduct, addProduct} = require('../controllers/product');

const router = Router();

//Metodos para solicitudes HTTP asociados al producto
router.post('/', addProduct);
router.get('/', getProducts);
router.put('/', editProduct);
router.delete('/', deleteProduct);

module.exports = router;