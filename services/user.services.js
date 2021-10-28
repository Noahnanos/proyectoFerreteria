const { response } = require('express');
const { pool } = require('../connectBBDD/connectBBDD');

async function userDB(email, pass) {

    //Se construye la consulta
    const values = [email, pass];
    const query = {
        text: 'SELECT email FROM account WHERE email = $1 AND pass = $2',
        values
    };
    
    try {
        //se hace la consulta
        const result = await pool.query(query);

        //se verifica si se encontró el usuario
        if (result.rows.length > 0) {
            return true;
        }else{
            return false;
        }
        
    } catch (error) {
        return res.status(500).json({
            error
        });
    }

    
}   

module.exports = {
    userDB
}