const mongoose = require('mongoose');

const CanchaSchema = new mongoose.Schema({
  numero: Number,
  disponible: Boolean,
  reservas: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reserva'
  }]
});

module.exports = mongoose.model('Cancha', CanchaSchema);
