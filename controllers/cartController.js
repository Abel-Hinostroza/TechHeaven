const Cart = require('../models/cart');
const Product = require('../models/product');

/**
 * Agregar un producto al carrito (Create).
 */
exports.addToCart = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;

        // Verificar si el producto existe
        const product = await Product.findByPk(productId);
        if (!product) {
            return res.status(404).render('error', { errorMessage: 'Producto no encontrado' });
        }

        // Verificar si el producto ya está en el carrito
        const existingCartItem = await Cart.findOne({
            where: { userId, productId },
        });

        if (existingCartItem) {
            // Actualizar la cantidad si ya existe
            existingCartItem.quantity += parseInt(quantity);
            await existingCartItem.save();
        } else {
            // Agregar nuevo producto al carrito
            await Cart.create({ userId, productId, quantity });
        }

        res.status(201).redirect(`/cart/${userId}`);
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { errorMessage: 'Error al agregar al carrito' });
    }
};

/**
 * Obtener los productos del carrito de un usuario (Read).
 */
exports.getCartByUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Obtener los productos del carrito junto con información del producto
        const cartItems = await Cart.findAll({
            where: { userId },
            include: {
                model: Product,
                attributes: ['name', 'price', 'imageUrl'],
            },
        });

        if (!cartItems.length) {
            return res.status(404).render('error', { errorMessage: 'El carrito está vacío' });
        }

        res.render('cart/cart', { cartItems });
    } catch (error) {
        console.error(error);
        res.status(500).render('error', { errorMessage: 'Error al obtener el carrito' });
    }
};
