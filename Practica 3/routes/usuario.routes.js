const express = require('express');
const UsuarioController = require('../controller/usuario.controller');

const usuarioController = ({ usuarioModel }) => {
    const router = express.Router();

    const usuario = new UsuarioController({ usuarioModel });

    router.get('/:id', usuario.getById);
    router.get('/', usuario.getAll);
    router.post('/', usuario.create);
    router.put('/:id', usuario.update);
    router.delete('/:id', usuario.eliminar);

    return router;
}

module.exports = usuarioController;