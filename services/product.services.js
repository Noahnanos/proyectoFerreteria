const { response } = require('express');

const {addProductDB, getProductsDB, editProductDB, deleteProductDB, verifyProduct} = require('../controllers/product.controller');

//obtener la lista de productos
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

//agregar un producto
async function addProduct(req, res = response){
    //desestructuracion del body
    const {name, price, quantity} = req.body;
    
    //Para verificar si el producto ya existe
    const verifyProd = await verifyProduct(name.toUpperCase());

    if (verifyProd.length > 0) {
        return res.status(400).json({
            ok: false,
            message: "El producto ya se encuentra registrado."
        });
    }

    //se genera la comunicacion con la base de datos
    const query = await addProductDB({name, price, quantity});

    //se evalua el resultado
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

//para editar un producto y devolver una respuesta
async function editProduct(req, res = response){

    //desestructuracion del body
    const { code, name, price, quantity } = req.body;
    
    //
    const result = await editProductDB({code, name, price, quantity });

    //se evalua el resultado
    if (result) {
        res.status(200).json({
            ok: true,
            resp: result
        });
    }else{
        res.status(500).json({
            ok: false
        });
    }
}

async function deleteProduct(req, res = response) {
    const code = req.query.code;
    
    //se llama al services
    const result = await deleteProductDB(code);
    
    //se evalua el resultado
    if (result == false) {
        res.status(200).json({
            ok: true,
            resp: result
        });
    }else{
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