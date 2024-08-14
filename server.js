const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const canchaRoutes = require('./routes/canchaRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const botRoutes = require('./routes/botRoutes');

const app = express();
const PORT = process.env.PORT || 3001;

// Middlewares
app.use(express.json()); // Para parsear JSON
app.use(bodyParser.urlencoded({ extended: false }));

// Conectar a MongoDB
mongoose.connect(process.env.MONGODB_URL, {
}).then(() => {
  console.log('Conectado a MongoDB');
}).catch((error) => {
  console.error('Error al conectar a MongoDB', error);
});

// Rutas
app.use('/api/canchas', canchaRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/bot', botRoutes);

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
