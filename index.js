const express = require('express');

//Inicializamos express
const app = express();

// Lectura y parse del Body de una peticion http
app.use(express.json());

//se ocupa la ruta especificada
app.use('/product', require('./routes/product'));
 
app.listen(3000, () => {
    console.log('Serividor corriendo en el puerto 3000');
});