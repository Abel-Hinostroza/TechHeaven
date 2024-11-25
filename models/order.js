const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');
const User = require('./user'); // Relación con usuarios

/**
 * Modelo de Pedido:
 * Representa los pedidos realizados por los usuarios.
 */
const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: false, // Monto total del pedido
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pendiente', // Estado inicial del pedido
    },
}, { timestamps: true });

// Relación: Un pedido pertenece a un usuario
Order.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Order);

module.exports = Order;
