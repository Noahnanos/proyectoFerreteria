const { Router } = require('express');

const {signIn} = require('../controllers/user');

const router = Router();

//Metodos para solicitudes HTTP asociados al producto
router.get('/', signIn);

module.exports = router;