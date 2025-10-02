const express = require('express');
const rutasLibros = require('./routes/libros');
const loggerMiddleware = require('./middlewares/logger');
const errorMiddleware = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(loggerMiddleware);

app.use('/api/libros', rutasLibros);

app.use(errorMiddleware);

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});