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
}

module.exports = new UsuarioModel();