const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { sequelize } = require('./utils/database'); // Conexión a la base de datos
const errorHandler = require('./middleware/error-handler'); // Middleware de manejo de errores
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const errorController = require('./controllers/errorController');

const app = express();

// Configuración de EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

// Página de inicio
app.get('/', (req, res) => {
    res.render('home', { pageTitle: 'Inicio' });
});

// Middleware para manejar rutas no encontradas
app.use((req, res, next) => {
    res.status(404).render('error', {
        pageTitle: 'Página no encontrada',
        errorMessage: 'La página que buscas no existe.',
    });
});

// Página de error
app.use(errorController.get404);

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar servidor y conexión a la base de datos
sequelize.sync()
    .then(() => {
        app.listen(3000, () => {
            console.log('Servidor corriendo en http://localhost:3000');
        });
    })
    .catch(err => console.error('Error al conectar a la base de datos:', err));
