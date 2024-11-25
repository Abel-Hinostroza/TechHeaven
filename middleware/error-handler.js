/**
 * Middleware de manejo de errores:
 * Captura y gestiona errores no controlados en la aplicación.
 */
module.exports = (err, req, res, next) => {
    console.error('Error:', err.stack); // Mostrar el error en consola

    const statusCode = err.status || 500; // Código de estado HTTP
    const message = err.message || 'Error interno del servidor';

    // Renderizar la página de error
    res.status(statusCode).render('error', {
        pageTitle: 'Error',
        errorMessage: message,
    });
};
