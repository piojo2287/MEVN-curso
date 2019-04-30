const mongoose = require('mongoose');
const { Schema } = mongoose;

const Sesion = new Schema ({
    id_ficha: String,
    nro_sesion: Number,
    fecha_sesion: Date,
    id_trat: String,
    desc_trat: String,
    duracion: Number,
    estado: String
});

module.exports = mongoose.model('Sesion', Sesion);