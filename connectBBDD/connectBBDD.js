const { Pool } = require('pg');

//Configuraciin de la conexion a la base de datos
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