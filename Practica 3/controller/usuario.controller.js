class UsuarioController {
    constructor({ usuarioModel }) {
        this.usuarioModel = usuarioModel;
    }

    getAll = (req, res) => {
        this.usuarioModel.getAll((err, rows) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Error al obtener los usuarios' });
            } else {
                res.status(200).json({ success: true, data: rows });
            }
        });
    }

    getById = (req, res) => {
        const { id } = req.params;
        this.usuarioModel.getById((err, row) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Error al obtener el usuario' });
            } else {
                res.status(200).json({ success: true, data: row });
            }
        }, id);
    }

    create = (req, res) => {
        const { nombre, correo, password, rol, estado } = req.body;
        this.usuarioModel.create((err, row) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Error al crear el usuario' });
            } else {
                if (row.affectedRows > 0) {
                    res.status(201).json({ success: true, message: 'Usuario creado correctamente' });
                } else {
                    res.status(400).json({ success: false, message: 'No se creo el usuario' });
                }
            }
        }, [nombre, correo, password, rol, estado]);
    }

    update = (req, res) => {
        const { id } = req.params;
        const { nombre, correo, password, rol, estado } = req.body;
        this.usuarioModel.update((err, row) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Error al actualizar el usuario' });
            } else {
                if (row.affectedRows > 0) {
                    res.status(200).json({ success: true, message: 'Usuario actualizado correctamente' });
                } else {
                    res.status(400).json({ success: false, message: 'No se pudo actualizar' });
                }
            }
        }, [nombre, correo, password, rol, estado, id]);
    }

    eliminar = (req, res) => {
        const { id } = req.params;
        this.usuarioModel.eliminar((err, row) => {
            if (err) {
                res.status(500).json({ success: false, message: 'Error al eliminar el usuario' });
            } else {
                if (row.affectedRows > 0) {
                    res.status(200).json({ success: true, message: 'Usuario eliminado correctamente' });
                } else {
                    res.status(400).json({ success: false, message: 'El usuario no se pudo eliminar' });
                }
            }
        }, id);
    }
}

module.exports = UsuarioController;