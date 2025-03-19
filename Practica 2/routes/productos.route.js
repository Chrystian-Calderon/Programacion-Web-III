const express = require('express');
const router = express.Router();
const { getProductos, getProductoById, createProducto, updateProducto, deleteProducto } = require('../controllers/productos.controller');

router.get('/productos/:id', getProductoById);
router.get('/productos', getProductos);
router.post('/productos', createProducto);
router.put('/productos/:id', updateProducto);
router.delete('/productos/:id', deleteProducto);

module.exports = router;