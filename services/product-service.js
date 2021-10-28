const { pool } = require('../connectBBDD/connectBBDD');


//Se obtiene la lista de productos de la base de datos
async function getProductsDB() {
    try {
        //se hace la consulta
        const result = await pool.query('SELECT code, name, price, quantity FROM product;');
        return result.rows;
    } catch (error) {
        return false;
    }

}

//Para añadir un producto a DB
async function addProductDB({name, price, quantity}) {
    //Se construye la consulta
    const values = [name.toUpperCase(), price, quantity];
    const query = {
        text : "INSERT INTO product (name, price, quantity) VALUES ($1, $2, $3)",
        values
    };

    try {
        //Se genera la consulta
        await pool.query(query);
        
        //Se envia el resultado de la consulta
        return true;
    } catch (error) {
        return false;
    }
}

//Para editar un producto de la DB
async function editProductDB(req, res = response){

    //desestructuracion del body
    const { code, name, price, quantity } = req.body;

    //Se construye la consulta
    const values = [name, price, quantity, code];
    const query = {
        text: "UPDATE product SET name = $1, price = $2, quantity = $3 WHERE code = $4 RETURNING *",
        values
    };

    try {
        //Se hace la consulta
        const result = await pool.query(query);
        return result.rows;
    } catch (error) {
        return false;
    }

}


async function verifyProduct(name) {
    try {
        //se hace la consulta
        const result = await pool.query(`SELECT code FROM product WHERE name = '${name}';`);
        return result.rows;
    } catch (error) {
        return false;
    }
}

module.exports = {
    addProductDB,
    getProductsDB,
    editProductDB,
    verifyProduct
}