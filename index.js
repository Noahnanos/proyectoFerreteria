const express = require('express');
const app = express();

//se ocupa la ruta especificada
app.use('/obtener', require('./routes/product'));
 
app.listen(3000, () => {
    console.log('Serividor corriendo en el puerto 3000');
});