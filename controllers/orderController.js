const Order = require('../models/order');
const Product = require('../models/product');

/**
 * Crear un nuevo pedido (Create).
 */
exports.createOrder = async (req, res) => {
    try {
        const { userId, items, total } = req.body;

        // Crear el pedido
        const order = await Order.create({ userId, total });

        // Asociar productos al pedido
        for (const item of items) {
            const product = await Product.findByPk(item.productId);
            if (!product) {
                return res.status(404).json({ message: `Producto con ID ${item.productId} no encontrado` });
            }
            await order.addProduct(product, { through: { quantity: item.quantity } });
        }

        res.status(201).json({ message: 'Pedido creado con éxito', order });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear pedido', error: error.message });
    }
};

/**
 * Obtener todos los pedidos de un usuario (Read).
 */
exports.getOrdersByUser = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: { userId: req.params.userId },
            include: Product, // Incluir productos asociados al pedido
        });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener pedidos', error: error.message });
    }
};

/**
 * Eliminar un pedido por ID (Delete).
 */
exports.deleteOrder = async (req, res) => {
    try {
        const order = await Order.findByPk(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Pedido no encontrado' });
        }

        await order.destroy();
        res.status(200).json({ message: 'Pedido eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar pedido', error: error.message });
    }
};
