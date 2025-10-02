const express = require('express');
const router = express.Router();
const { v4: uuidv4, validate: isUUID } = require('uuid');

let libros = require('../data/libros_1000.json');


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

router.post('/', (req, res) => {
    const { title, author, year } = req.body;

    if (!title || !author) {
        return res.status(400).json({ error: 'Los campos title y author son obligatorios.' });
    }

    if (year) {
        const existe = libros.some(libro => libro.title === title && libro.year === year);
        if (existe) {
            return res.status(409).json({ error: 'Ya existe un libro con el mismo título y año.' });
        }
    }

    const nuevoLibro = {
        id: uuidv4(),
        title,
        author,
        year: year || null
    };

    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    if (!isUUID(id)) {
        return res.status(400).json({ error: 'El formato del ID no es un UUID válido.' });
    }

    const libroIndex = libros.findIndex(l => l.id === id);

    if (libroIndex === -1) {
        return res.status(404).json({ error: 'Libro no encontrado.' });
    }

    const libroEliminado = libros.splice(libroIndex, 1);
    res.status(200).json(libroEliminado[0]);
});

module.exports = router;