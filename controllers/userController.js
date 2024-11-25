const User = require('../models/user'); // Importar el modelo de usuario

/**
 * Obtener todos los usuarios (Read).
 */
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll(); // Obtener todos los usuarios
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios', error: error.message });
    }
};

/**
 * Obtener un usuario por ID (Read).
 */
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id); // Buscar usuario por ID
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuario', error: error.message });
    }
};

/**
 * Actualizar información de un usuario (Update).
 */
exports.updateUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Actualizar datos del usuario
        const updatedUser = await user.update(req.body);
        res.status(200).json({ message: 'Usuario actualizado con éxito', user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar usuario', error: error.message });
    }
};

/**
 * Eliminar un usuario por ID (Delete).
 */
exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Eliminar el usuario
        await user.destroy();
        res.status(200).json({ message: 'Usuario eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar usuario', error: error.message });
    }
};
