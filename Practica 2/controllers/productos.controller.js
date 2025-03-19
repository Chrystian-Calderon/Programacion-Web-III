const getDBConnection = require('../db/index');

const getProductos = async (req, res) => {
    const mode = req.headers['x-db-mode'] || 'promise';
    const db = getDBConnection(mode);

    try {
        if (mode === 'basic' || mode === 'pool') {
        db.query('SELECT p.nombre, p.precio, p.stock, c.nombre AS categoria FROM productos p JOIN LEFT categorias c ON p.id_categoria = c.id_categoria', (err, results) => {
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

const getProductoById = async (req, res) => {}

const createProducto = async (req, res) => {
    const mode = req.headers['x-db-mode'] || 'promise';
    const db = getDBConnection(mode);
    const { nombre, descripcion, precio, stock, categorias } = req.body;

    try {
        if (mode === 'basic' || mode === 'pool') {
            db.query('INSERT INTO productos(`nombre`, `descripcion`, `precio`, `stock`, `id_categoria`) VALUES (?, ?, ?, ?, ?)', [nombre, descripcion, precio, stock, categorias], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ modo: mode, id: results.insertId });
            });
        } else {
            const [rows] = await db.query('INSERT INTO productos(`nombre`, `descripcion`, `precio`, `stock`, `id_categoria`) VALUES (?, ?, ?, ?)', [nombre, descripcion, precio, stock, categorias]);
            res.json({ modo: mode, id: rows.insertId });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

const deleteProducto = async(req, res) => {

}

module.exports = { getProductos, getProductoById, createProducto, deleteProducto };