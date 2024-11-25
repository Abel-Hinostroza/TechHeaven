const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');
const Product = require('./product');
const User = require('./user');

/**
 * Modelo de Carrito:
 * Representa los productos añadidos al carrito por los usuarios.
 */
const Cart = sequelize.define('Cart', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1, // Cantidad por defecto
    },
}, { timestamps: true });

// Relación: Un carrito pertenece a un usuario
Cart.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasOne(Cart);

// Relación: Un carrito tiene muchos productos
Cart.belongsToMany(Product, { through: 'CartProducts' });
Product.belongsToMany(Cart, { through: 'CartProducts' });

module.exports = Cart;
