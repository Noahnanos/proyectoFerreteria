const { response } = require('express');
const { pool } = require('../connectBBDD/connectBBDD');

async function getProducts(req, res = response) {
    try {
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

module.exports = {
    getProducts
}