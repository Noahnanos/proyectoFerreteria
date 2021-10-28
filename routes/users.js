const { Router } = require('express');

const {signIn} = require('../controllers/user.controller');

const router = Router();

//Metodos para solicitudes HTTP asociados al inicio de sesion
router.get('/', signIn);

module.exports = router;