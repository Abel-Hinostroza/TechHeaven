const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

/**
 * Rutas de autenticación:
 * - POST /auth/register: Registrar un nuevo usuario
 * - POST /auth/login: Iniciar sesión
 */

// Registrar un nuevo usuario
router.post('/register', authController.register);

// Iniciar sesión
router.post('/login', authController.login);

// Ruta para actualizar la contraseña
router.post('/update-password', authController.updatePassword);

module.exports = router;
