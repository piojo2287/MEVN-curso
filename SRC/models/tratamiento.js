const mongoose = require('mongoose');
const { Schema } = mongoose;

const Tratamiento = new Schema ({
    descripcion: String,
    estado: String
});

module.exports = mongoose.model('Tratamiento', Tratamiento);