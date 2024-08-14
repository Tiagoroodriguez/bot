const express = require('express');
const router = express.Router();
const botController = require('../controllers/botController');

// Endpoint para recibir mensajes de WhatsApp
router.post('/webhook', botController.handleMessage);

module.exports = router;