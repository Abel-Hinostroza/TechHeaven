const Product = require('../models/product');

/**
 * Crear un nuevo producto (Create).
 */
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, imageUrl, stock, category } = req.body;

        // Crear el producto
        const product = await Product.create({ name, description, price, imageUrl, stock, category });
        res.status(201).json({ message: 'Producto creado con éxito', product });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear producto', error: error.message });
    }
};

/**
 * Obtener todos los productos (Read).
 */
exports.getAllProducts = async (req, res) => {
    try {
        // Recuperar todos los productos de la base de datos
        const products = await Product.findAll();
        
        // Renderizar la vista del listado de productos
        res.render('product/product-list', { products });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos', error: error.message });
    }
};

/**
 * Obtener un producto por ID (Read).
 */
exports.getProductById = async (req, res) => {
    try {
        // Buscar producto por ID
        const product = await Product.findByPk(req.params.id);

        // Si el producto no existe, devolver un error 404
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Renderizar la vista de detalles del producto
        res.render('product/product-detail', { product });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener producto', error: error.message });
    }
};

/**
 * Actualizar un producto (Update).
 */
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Actualizar datos del producto
        const updatedProduct = await product.update(req.body);
        res.status(200).json({ message: 'Producto actualizado con éxito', product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar producto', error: error.message });
    }
};

/**
 * Eliminar un producto (Delete).
 */
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        // Eliminar el producto
        await product.destroy();
        res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar producto', error: error.message });
    }
};
