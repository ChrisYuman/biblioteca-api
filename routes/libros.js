const express = require('express');
const router = express.Router();
const { validate: isUUID } = require('uuid');

const libros = require('../data/libros_1000.json');


router.get('/', (req, res) => {
    const { year } = req.query;

    if (year) {
        const librosFiltrados = libros.filter(libro => libro.year === parseInt(year));
        return res.json(librosFiltrados);
    }

    res.json(libros);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;

    if (!isUUID(id)) {
        return res.status(400).json({ error: 'El formato del ID no es un UUID válido.' });
    }

    const libro = libros.find(l => l.id === id);

    if (!libro) {
        return res.status(404).json({ error: 'Libro no encontrado.' });
    }

    res.json(libro);
});
module.exports = router;