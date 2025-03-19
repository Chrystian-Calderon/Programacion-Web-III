const express = require('express');
const router = express.Router();
const { getProductos, getProductoById, createProducto } = require('../controllers/productos.controller');

router.get('/productos/:id', getProductoById);
router.get('/productos', getProductos);
router.post('/productos', createProducto);

module.exports = router;