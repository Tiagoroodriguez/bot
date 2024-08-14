const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
  usuario: String,
  fecha: Date,
  hora: String,
  cancha: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cancha'
  }
});

module.exports = mongoose.model('Reserva', ReservaSchema);
