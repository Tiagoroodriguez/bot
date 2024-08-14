const express = require('express');
const router = express.Router();
const canchaController = require('../controllers/canchaController');

// Ruta para obtener todas las canchas
router.get('/', canchaController.getAllCanchas);

// Ruta para crear una nueva cancha
router.post('/', canchaController.createCancha);

// Ruta para actualizar la disponibilidad de una cancha
router.put('/:id', canchaController.updateCancha);

// Ruta para obtener una cancha por ID
router.get('/:id', canchaController.getCanchaById);

module.exports = router;
