const mongoose = require('mongoose');

const deporteSchema = new mongoose.Schema({
  nombre: String,
  descripcion: String
});

module.exports = mongoose.model('Deporte', deporteSchema);