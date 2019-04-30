const mongoose = require('mongoose');
const { Schema } = mongoose;

const Ficha = new Schema ({
    id_paciente: String,
    nombre_paciente: String,
    obra_social: String,
    afiliado: String,
    diagnostico: String,
    autorizado: Boolean,
    procedimiento: String,
    ultima_sesion: Number,
    total_sesiones: Number,
    estado: String
});

module.exports = mongoose.model('Ficha', Ficha);