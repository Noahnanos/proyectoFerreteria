const { Router } = require('express');

const { getProducts, editProduct,  deleteProduct, addProduct} = require('../services/product.services');
const {validateFields} = require('../middlewares/validateForm');

const router = Router();

//Metodos para solicitudes HTTP asociados al producto
router.post('/', validateFields, addProduct);
router.get('/', getProducts);
router.put('/', validateFields, editProduct);
router.delete('/', deleteProduct);

module.exports = router;