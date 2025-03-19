const express = require('express');
const cors = require('cors');
const path = require('path');

const routeProductos = require('./routes/productos.route');
const routeCategorias = require('./routes/categorias.route');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', routeProductos);
app.use('/api', routeCategorias);

app.listen(port, () => {
    console.log('Server en puerto: ', port);
});