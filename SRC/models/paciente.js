const Mongoose = require('Mongoose');
const { Schema } = Mongoose;

const Paciente = new Schema ({
    nombre: String,
    apellido: String,
    fecha_nac: Date,
    genero: String,
    domicilio: String,
   
});

module.exports = Mongoose.model('Paciente', Paciente);



