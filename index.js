const express = require('express');
const cors = require('cors');

//Inicializamos express
const app = express();

app.use(cors());

// Lectura y parse del Body de una peticion http
app.use(express.json());

//establecemos las rutas a utilizar
app.use('/products', require('./routes/products'));
app.use('/signIn', require('./routes/users'));
 
//se inicia el servidor para escuchar conecciones
app.listen(3000, () => {
    console.log('Serividor corriendo en el puerto 3000');
});