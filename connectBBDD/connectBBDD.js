//Pool para permitir la conexion de multiples clientes
const { Pool } = require('pg');

//Configuracion de la conexion a la base de datos
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ferreteria',
    password: 'dockerpw',
    port: 5432,
});

module.exports = {
    pool
}