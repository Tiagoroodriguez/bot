const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');

// Ruta para obtener todas las reservas
router.get('/', reservaController.getAllReservas);

// Ruta para crear una nueva reserva
router.post('/', reservaController.createReserva);

// Ruta para cancelar una reserva
router.delete('/:id', reservaController.cancelReserva);

module.exports = router;
