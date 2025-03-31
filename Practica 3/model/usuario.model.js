const connection = require('../config/config');

class UsuarioModel {
    constructor() {
        this.conn = connection;
    }

    getAll(callback) {
        this.conn.query('SELECT * FROM usuarios', (err, rows) => {
            if (err) return callback(err, null);
            callback(null, rows);
        });
    }

    getById(callback, id) {
        this.conn.query('SELECT * FROM usuarios WHERE id_usuario = ?', [id], (err, row) => {
            if (err) return callback(err, null);
            callback(null, row);
        })
    }

    create(callback, data) {
        const [nombre, correo, password, rol, estado] = data;
        this.conn.query('INSERT INTO usuarios SET nombre = ?, correo = ?, password = ?, rol = ?, estado = ?', [nombre, correo, password, rol, estado], (err, row) => {
            if (err) return callback(err, null);
            callback(null, row);
        })
    }

    update(callback, data) {
        const [nombre, correo, password, rol, estado, id] = data;
        this.conn.query('UPDATE usuarios SET nombre = ?, correo = ?, password = ?, rol = ?, estado = ? WHERE id_usuario = ?', [nombre, correo, password, rol, estado, id], (err, row) => {
            if (err) return callback(err, null);
            callback(null, row);
        })
    }

    eliminar(callback, id) {
        this.conn.query('DELETE FROM usuarios WHERE id_usuario = ?', [id], (err, row) => {
            if (err) return callback(err, null);
            callback(null, row);
        })
    }
}

module.exports = new UsuarioModel();