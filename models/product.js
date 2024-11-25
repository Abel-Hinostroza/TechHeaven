const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/database');

/**
 * Modelo de Producto:
 * Representa los productos disponibles en la tienda.
 */
const Product = sequelize.define('Product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false, // Obligatorio
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false, // Descripción del producto
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false, // Precio del producto
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false, // Ruta de la imagen del producto
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false, // Cantidad disponible
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false, // Categoría del producto
    },
}, { timestamps: true });

module.exports = Product;
