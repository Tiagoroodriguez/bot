const Cancha = require('../models/Cancha');

// Obtener todas las canchas
exports.getAllCanchas = async (req, res) => {
  try {
    const canchas = await Cancha.find();
    res.status(200).json(canchas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener canchas', error });
  }
};

// Crear una nueva cancha
exports.createCancha = async (req, res) => {
  const { numero } = req.body;
  try {
    const nuevaCancha = new Cancha({ numero, disponible: true });
    await nuevaCancha.save();
    res.status(201).json(nuevaCancha);
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cancha', error });
  }
};

// Actualizar la disponibilidad de una cancha
exports.updateCancha = async (req, res) => {
  const { id } = req.params;
  const { disponible } = req.body;
  try {
    const cancha = await Cancha.findByIdAndUpdate(id, { disponible }, { new: true });
    res.status(200).json(cancha);
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar cancha', error });
  }
};

// Obtener una cancha por ID
exports.getCanchaById = async (req, res) => {
  const { id } = req.params;
  try {
    const cancha = await Cancha.findById(id);
    res.status(200).json(cancha);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener cancha', error });
  }
};
