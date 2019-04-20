const mongoose = require('mongoose');
const { Schema } = mongoose;

const Turno = new Schema ({
    orden_turno: Number,
    tipo_turno: String,
    fecha_ref: String,
    fecha_turno: Date,
    hora_inicio: String, 
    orden: Number,
    orden_hora: Number,
    id_paciente: String,
    nombre_paciente: String,
    dx: String,
    estado: String
});

module.exports = mongoose.model('Turno', Turno);