const express = require('express');
const productController = require('../controllers/productController'); // Controlador de productos
const router = express.Router();

/**
 * Rutas de productos:
 * - GET /products: Obtener todos los productos
 * - GET /products/:id: Obtener un producto por ID
 * - POST /products: Crear un nuevo producto
 * - PUT /products/:id: Actualizar un producto existente
 * - DELETE /products/:id: Eliminar un producto
 */

// Obtener todos los productos
router.get('/', productController.getAllProducts);

// Obtener un producto por ID
router.get('/:id', productController.getProductById);

// Crear un nuevo producto
router.post('/', productController.createProduct);

// Actualizar un producto existente
router.put('/:id', productController.updateProduct);

// Eliminar un producto
router.delete('/:id', productController.deleteProduct);

module.exports = router;
