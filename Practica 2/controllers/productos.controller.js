const getDBConnection = require('../db/index');

const getProductos = async (req, res) => {
    const mode = req.headers['x-db-mode'] || 'promise';
    const db = getDBConnection(mode);

    try {
        if (mode === 'basic' || mode === 'pool') {
        db.query('SELECT * FROM productos', (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ modo: mode, results });
        });
        } else {
        const [rows] = await db.query('SELECT * FROM productos');
        res.json({ modo: mode, results: rows });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

module.exports = { getProductos };