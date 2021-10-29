const { response } = require('express');

const { userDB } = require('../controllers/user.controller');

//funcion que permite el inicio
async function signIn(req, res = response) {
    //desestructuracion del body
    const { email, pass } = req.body;

    const result = await userDB(email, pass);

    //se verifica si se encontró el usuario
    if (result) {
        res.status(200).json({
            ok: true,
            user: result.rows
        });
    }else{
        res.status(401).json({
            ok: false,
            error: "Credenciales inválidas"
        });
    }
}   

module.exports = {
    signIn
}