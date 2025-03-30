class UsuarioController {
    constructor({ usuarioModel }) {
        this.usuarioModel = usuarioModel;
    }

    getAll = (req, res) => {
        this.usuarioModel.getAll((err, rows) => {
            if (err) {
                res.status(500).json({ error: 'Error al obtener los usuarios' });
            } else {
                res.status(200).json(rows);
            }
        });
    }
}

module.exports = UsuarioController;