const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config(); // Cargar las variables de entorno desde .env

/**
 * Configuración del transporte de correo
 * Usamos Nodemailer para enviar correos electrónicos.
 */
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_SECURE === 'true', // true para SSL/TLS
    auth: {
        user: process.env.EMAIL_USER, // Usuario del servicio de correo
        pass: process.env.EMAIL_PASSWORD, // Contraseña del servicio de correo
    },
});

/**
 * Función para enviar un correo electrónico
 * @param {string} to - Dirección de correo del destinatario
 * @param {string} subject - Asunto del correo
 * @param {string} html - Contenido HTML del correo
 */
const sendEmail = async (to, subject, html) => {
    try {
        await transporter.sendMail({
            from: process.env.EMAIL_FROM, // Dirección de correo del remitente
            to,
            subject,
            html,
        });
        console.log('Correo enviado con éxito a:', to);
    } catch (error) {
        console.error('Error al enviar el correo:', error.message);
    }
};

module.exports = sendEmail;
