const { response } = require('express');
const { pool } = require('../connectBBDD/connectBBDD');

async function signIn(req, res = response) {
    //desestructuracion del body
    const { email, pass } = req.body;

    //Se construye la consulta
    const values = [email, pass];
    const query = {
        text: 'SELECT * FROM account WHERE email = $1 AND pass = $2',
        values
    };
    
    try {
        //se hace la consulta
        const result = await pool.query(query);

        //se verifica si se encontró el usuario
        if (result.rows.length > 0) {
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
        
    } catch (error) {
        res.status(500).json({
            error
        });
    }

    
}   

module.exports = {
    signIn
}