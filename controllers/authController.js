const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * Registrar un nuevo usuario (Create).
 */
exports.register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).render('error', { errorMessage: 'El usuario ya existe' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(password, 12);

        // Crear el usuario
        const user = await User.create({ email, password: hashedPassword });
        res.status(201).redirect('/auth/login');
    } catch (error) {
        res.status(500).render('error', { errorMessage: 'Error al registrar usuario' });
    }
};

/**
 * Iniciar sesión (Read).
 */
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar usuario por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).render('error', { errorMessage: 'Usuario no encontrado' });
        }

        // Verificar contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).render('error', { errorMessage: 'Contraseña incorrecta' });
        }

        // Generar token JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).redirect('/');
    } catch (error) {
        res.status(500).render('error', { errorMessage: 'Error al iniciar sesión' });
    }
};

/**
 * Actualizar la contraseña de un usuario (Update).
 */
exports.updatePassword = async (req, res) => {
    try {
        const { email, currentPassword, newPassword } = req.body;

        // Buscar usuario por email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).render('error', { errorMessage: 'Usuario no encontrado' });
        }

        // Verificar la contraseña actual
        const isPasswordValid = await bcrypt.compare(currentPassword, user.password);
        if (!isPasswordValid) {
            return res.status(401).render('error', { errorMessage: 'Contraseña actual incorrecta' });
        }

        // Encriptar la nueva contraseña
        const hashedNewPassword = await bcrypt.hash(newPassword, 12);

        // Actualizar la contraseña en la base de datos
        user.password = hashedNewPassword;
        await user.save();

        res.status(200).redirect('/auth/login'); // Redirigir a inicio de sesión
    } catch (error) {
        res.status(500).render('error', { errorMessage: 'Error al actualizar la contraseña' });
    }
};
