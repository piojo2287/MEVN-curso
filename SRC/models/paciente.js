const mongoose = require('mongoose');
const { Schema } = mongoose;

const Paciente = new Schema ({
    nombre: String,
    apellido: String,
    fecha_nac: Date,
    genero: String,
    domicilio: String,
   
});

module.exports = mongoose.model('Paciente', Paciente);



