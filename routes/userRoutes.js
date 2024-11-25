const express = require('express');
const userController = require('../controllers/userController');
const isAuth = require('../middleware/is-auth'); // Importar middleware

const router = express.Router();

/**
 * Rutas de usuarios:
 * - GET /users: Obtener todos los usuarios
 * - GET /users/:id: Obtener un usuario por ID
 * - PUT /users/:id: Actualizar un usuario existente
 * - DELETE /users/:id: Eliminar un usuario
 */

// Obtener todos los usuarios
router.get('/', isAuth, userController.getAllUsers);

// Obtener un usuario por ID
router.get('/:id', isAuth, userController.getUserById);

// Actualizar un usuario existente
router.put('/:id', isAuth, userController.updateUser);

// Eliminar un usuario
router.delete('/:id', isAuth, userController.deleteUser);

module.exports = router;
