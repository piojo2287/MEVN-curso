const mongoose = require('mongoose');
const { Schema } = mongoose;

const ObraSocial = new Schema ({
    descripcion: String,
    estado: String
});

module.exports = mongoose.model('ObraSocial', ObraSocial);