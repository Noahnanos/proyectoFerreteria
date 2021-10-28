const { Router } = require('express');

const {signIn} = require('../services/user.services');

const router = Router();

//Metodos para solicitudes HTTP asociados al inicio de sesion
router.get('/', signIn);

module.exports = router;