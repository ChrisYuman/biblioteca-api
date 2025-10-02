function errorMiddleware(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Ocurrió un error inesperado en el servidor.';

    console.error(err);

    res.status(statusCode).json({
        error: message
    });
}

module.exports = errorMiddleware;