const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config(); // Cargar las variables de entorno desde .env

/**
 * Configuración de la conexión a la base de datos
 * Sequelize se utiliza como ORM para interactuar con MySQL
 */
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',
    logging: false, // Desactiva los logs para mantener la consola limpia
});

/**
 * Conexión a la base de datos
 */
const connectDB = async () => {
    try {
        await sequelize.authenticate(); // Probar la conexión
        console.log('Conexión a la base de datos establecida correctamente.');
        await sequelize.sync(); // Sincronizar modelos con la base de datos
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error.message);
        process.exit(1); // Salir del proceso si hay un error
    }
};

module.exports = { sequelize, connectDB };
