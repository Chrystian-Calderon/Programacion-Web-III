const getDBConnection = require('../db/index');

const getProductos = async (req, res) => {
    const mode = req.headers['x-db-mode'] || 'promise';
    console.time('ALL Conexion ' + mode);
    const db = getDBConnection(mode);

    try {
        if (mode === 'basic' || mode === 'pool') {
            db.query('SELECT p.id_producto, p.nombre, p.precio, p.stock, c.nombre AS categoria, c.id_categoria FROM productos p LEFT JOIN categorias c ON p.id_categoria = c.id_categoria', (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ modo: mode, results });
            });
        } else {
            const [rows] = await db.query('SELECT p.id_producto, p.nombre, p.precio, p.stock, c.nombre AS categoria, c.id_categoria FROM productos p LEFT JOIN categorias c ON p.id_categoria = c.id_categoria');
            res.json({ modo: mode, results: rows });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    } finally {
        console.timeEnd('ALL Conexion ' + mode);
    }
};

const getProductoById = async (req, res) => {
    const mode = req.headers['x-db-mode'] || 'promise';
    console.time('GET Conexion ' + mode);
    const db = getDBConnection(mode);
    const { id } = req.params;

    try {
        if (mode === 'basic' || mode === 'pool') {
            db.query('SELECT * FROM productos WHERE id_producto = ?', [id], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ modo: mode, results });
            });
        } else {
            const [rows] = await db.query('SELECT * FROM productos WHERE id_producto = ?', [id]);
            res.json({ modo: mode, results: rows });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    } finally {
        console.timeEnd('GET Conexion ' + mode);
    }
}

const createProducto = async (req, res) => {
    const mode = req.headers['x-db-mode'] || 'promise';
    console.time('CREATE Conexion ' + mode);
    const db = getDBConnection(mode);
    const { nombre, descripcion, precio, stock, categorias } = req.body;

    try {
        if (mode === 'basic' || mode === 'pool') {
            db.query('INSERT INTO productos(`nombre`, `descripcion`, `precio`, `stock`, `id_categoria`) VALUES (?, ?, ?, ?, ?)', [nombre, descripcion, precio, stock, categorias], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ modo: mode, id: results.insertId });
            });
        } else {
            const [rows] = await db.query('INSERT INTO productos(`nombre`, `descripcion`, `precio`, `stock`, `id_categoria`) VALUES (?, ?, ?, ?, ?)', [nombre, descripcion, precio, stock, categorias]);
            res.json({ modo: mode, id: rows.insertId });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    } finally {
        console.timeEnd('CREATE Conexion ' + mode);
    }
}

const updateProducto = async (req, res) => {
    const mode = req.headers['x-db-mode'] || 'promise';
    console.time('UPDATE Conexion ' + mode);
    const db = getDBConnection(mode);
    const { nombre, descripcion, precio, stock, categorias } = req.body;
    const { id } = req.params;

    try {
        if (mode === 'basic' || mode === 'pool') {
            db.query('UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, id_categoria=? WHERE id_producto = ?', [nombre, descripcion, precio, stock, categorias, id], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ modo: mode, success: (results.affectedRows > 0) });
            });
        } else {
            const [rows] = await db.query('UPDATE productos SET nombre=?, descripcion=?, precio=?, stock=?, id_categoria=? WHERE id_producto = ?', [nombre, descripcion, precio, stock, categorias, id]);
            res.json({ modo: mode, success: (rows.affectedRows > 0) });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    } finally {
        console.timeEnd('UPDATE Conexion ' + mode);
    }
}

const deleteProducto = async(req, res) => {
    const mode = req.headers['x-db-mode'] || 'promise';
    console.time('DELETE Conexion ' + mode);
    const db = getDBConnection(mode);
    const { id } = req.params;

    try {
        if (mode === 'basic' || mode === 'pool') {
            db.query('DELETE FROM productos WHERE id_producto = ?', [id], (err, results) => {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ modo: mode, success: (results.affectedRows > 0) });
            });
        } else {
            const [rows] = await db.query('DELETE FROM productos WHERE id_producto = ?', [id]);
            res.json({ modo: mode, success: (rows.affectedRows > 0) });
        }
    } catch (e) {
        res.status(500).json({ error: e.message });
    } finally {
        console.timeEnd('DELETE Conexion ' + mode);
    }
}

module.exports = { getProductos, getProductoById, createProducto, updateProducto, deleteProducto };