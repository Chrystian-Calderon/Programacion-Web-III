const getDBConnection = require('../db/index');

const getCategorias = async (req, res) => {
    const mode = req.headers['x-db-mode'] || 'promise';
    console.time('Conexion ' + mode);
    const db = getDBConnection(mode);

    try {
        if (mode === 'basic' || mode === 'pool') {
            db.query('SELECT * FROM categorias', (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ modo: mode, results });
            });
        } else {
            const [rows] = await db.query('SELECT * FROM categorias');
            res.json({ modo: mode, results: rows });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    } finally {
        console.timeEnd('Conexion ' + mode);
    }
}

module.exports = { getCategorias };