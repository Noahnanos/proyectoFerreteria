const { response } = require('express');
const { pool } = require('../connectBBDD/connectBBDD');

async function getProducts(req, res = response) {
    try {
        //se hace la consulta
        const result = await pool.query('SELECT * FROM product;');
        res.status(200).json({
            products: result.rows
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

async function editProduct(req, res = response){
    //desestructuracion del body
    const { code, name, price, quantity } = req.body;

    //Se construye la consulta
    const values = [name, price, quantity, code];
    const query = {
        text: "UPDATE product SET name = $1, price = $2, quantity = $3 WHERE code = $4 RETURNING *",
        values
    };

    try {
        //Se genera la consulta
        const result = await pool.query(query);

        //Se envia el resultado de la consulta
        res.status(200).json({
            ok: true,
            resp: result.rows
        });
    } catch (error) {
        res.status(500).json({
            error
        });
    }
}

async function deleteProduct(req, res = response) {

    try {
        const code = req.query.code;
        const result = await pool.query(`DELETE FROM product WHERE code = ${code}`);
        res.status(200).json({
            ok: true,
            resp: result.rows
        });
    } catch (error) {
        res.status(500).json({
            ok: false
        });
    }
}

module.exports = {
    getProducts,
    editProduct,
    deleteProduct
}