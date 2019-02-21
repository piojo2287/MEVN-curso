const mongoose = require('mongoose');
const { Schema } = mongoose;

const Turno = new Schema ({
    id_paciente: String,
    fecha_turno: Date,
    hora_inicio: String,
    hora_final: String,
    tipo_tratamiento: String
});

module.exports = mongoose.model('Turno', Turno);