const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database'); // Conexión a la base de datos

/**
 * Modelo de Usuario:
 * Representa a los usuarios registrados en el sistema.
 */
const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, // No se permiten correos duplicados
        validate: {
            isEmail: true, // Validación para asegurarse de que es un correo válido
        },
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, { timestamps: true }); // Sequelize agrega automáticamente createdAt y updatedAt

module.exports = User;
