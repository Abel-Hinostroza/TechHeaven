const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación:
 * Verifica si el usuario está autenticado mediante un token JWT.
 */
module.exports = (req, res, next) => {
    try {
        // Obtener el token del encabezado de autorización
        const token = req.headers.authorization?.split(' ')[1]; // Formato: "Bearer <token>"

        if (!token) {
            return res.status(401).json({ message: 'No autorizado, token no proporcionado' });
        }

        // Verificar el token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decodedToken.userId; // Agregar el ID del usuario al objeto req
        next(); // Continuar con la siguiente función
    } catch (error) {
        res.status(401).json({ message: 'No autorizado, token inválido' });
    }
};
