const express = require('express');
const cors = require('cors');

const usuarioModel = require('./model/usuario.model');
const usuarioRoutes = require('./routes/usuario.routes');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use(express.static('view'));

app.use('/usuario', usuarioRoutes({ usuarioModel }));

app.listen(port, () => {
    console.log('Servidor en puerto ' + port);
});