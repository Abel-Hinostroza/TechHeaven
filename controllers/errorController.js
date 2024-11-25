/**
 * Middleware para manejar errores globales.
 */
exports.handleError = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Error inesperado en el servidor',
        error: process.env.NODE_ENV === 'development' ? err : {},
    });
};
