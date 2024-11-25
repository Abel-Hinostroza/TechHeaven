const express = require('express');
const cartController = require('../controllers/cartController'); // Controlador de carritos
const router = express.Router();

/**
 * Rutas de carrito:
 * - POST /cart: Agregar un producto al carrito
 * - GET /cart/:userId: Obtener el carrito de un usuario
 */

// Agregar un producto al carrito
router.post('/', cartController.addToCart);

// Obtener el carrito de un usuario
router.get('/:userId', cartController.getCartByUser);

module.exports = router;
