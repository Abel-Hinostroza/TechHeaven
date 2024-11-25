const express = require('express');
const orderController = require('../controllers/orderController');
const isAuth = require('../middleware/is-auth'); // Importar middleware

const router = express.Router();
/**
 * Rutas de pedidos:
 * - POST /orders: Crear un nuevo pedido
 * - GET /orders/user/:userId: Obtener todos los pedidos de un usuario
 * - DELETE /orders/:id: Eliminar un pedido por ID
 */

// Crear un nuevo pedido
router.post('/', isAuth, orderController.createOrder);

// Obtener todos los pedidos de un usuario
router.get('/user/:userId', isAuth, orderController.getOrdersByUser);

// Eliminar un pedido por ID
router.delete('/:id', isAuth, orderController.deleteOrder);

module.exports = router;
