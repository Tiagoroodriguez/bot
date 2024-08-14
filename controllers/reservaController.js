const Reserva = require('../models/Reserva');
const Cancha = require('../models/Cancha');

// Obtener todas las reservas
exports.getAllReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('cancha');
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reservas', error });
  }
};

// Crear una reserva
exports.createReserva = async (req, res) => {
  const { usuario, fecha, hora, canchaId } = req.body;

  try {
    // Verificar si la cancha está disponible
    const cancha = await Cancha.findById(canchaId);
    if (!cancha) {
      return res.status(404).json({ message: 'Cancha no encontrada' });
    }

    if (!cancha.disponible) {
      return res.status(400).json({ message: 'Cancha no disponible' });
    }

    // Crear la nueva reserva
    const nuevaReserva = new Reserva({
      usuario,
      fecha,
      hora,
      cancha: canchaId
    });

    await nuevaReserva.save();

    // Marcar la cancha como no disponible
    cancha.disponible = false;
    await cancha.save();

    res.status(201).json({ message: 'Reserva creada', reserva: nuevaReserva });
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ message: 'Error al crear reserva', error });
  }
};


// Cancelar una reserva
exports.cancelReserva = async (req, res) => {
  const { id } = req.params;
  try {
    // Buscar la reserva por ID
    const reserva = await Reserva.findById(id).populate('cancha');
    
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }

    // Obtener la cancha asociada a la reserva
    const cancha = reserva.cancha;
    
    // Marcar la cancha como disponible
    cancha.disponible = true;
    await cancha.save();

    // Eliminar la reserva usando findByIdAndDelete
    await Reserva.findByIdAndDelete(id);

    res.status(200).json({ message: 'Reserva cancelada' });
  } catch (error) {
    console.error('Error al cancelar reserva:', error);
    res.status(500).json({ message: 'Error al cancelar reserva', error });
  }
};
