const express = require('express');
const UsuarioController = require('../controller/usuario.controller');

const usuarioController = ({ usuarioModel }) => {
    const router = express.Router();

    const usuario = new UsuarioController({ usuarioModel });

    router.get('/', usuario.getAll);

    return router;
}

module.exports = usuarioController;