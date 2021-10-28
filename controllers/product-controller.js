const { response } = require('express');

const { pool } = require('../connectBBDD/connectBBDD');
const {addProductDB, getProductsDB, editProductDB, verifyProduct} = require('../services/product-service');
const product = require('../models/product');


async function getProducts(req, res = response) {
    //se llama a función que se comunica con la db
    const products = await getProductsDB();

    //Se válida el resultado
    if (products) {
        res.status(200).json({
            ok: true,
            products
        });
    }else{
        res.status(500).json({
            ok: products
        });
    }
}

//
async function addProduct(req, res = response){
    //desestructuracion del body
    const {name, price, quantity} = req.body;
    
    const verifyProd = await verifyProduct(name.toUpperCase());
    console.log(verifyProd)
    if (verifyProd.length > 0) {
        return res.status(400).json({
            ok: false,
            message: "El producto ya se encuentra registrado."
        });
    }

    const query = await addProductDB({name, price,quantity});
    if (query) {
        res.status(201).json({
            ok: query,
            message: 'El producto se agrego correctamente.'
        });
    } else {
        res.status(500).json({
            ok: query,
            message: "Error interno del servidor."
        });
    }
    
}

async function editProduct(req, res = response){
    
    const result = await editProductDB();

    if (result) {
        res.status(200).json({
            ok: true,
            resp: result.rows
        });
    }else{
        res.status(500).json({
            ok: false
        });
    }
}

async function deleteProduct(req, res = response) {

    try {
        const code = req.query.code;
        //Se hace la consulta
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
    deleteProduct,
    addProduct
}