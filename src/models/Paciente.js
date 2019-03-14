const mongoose = require("mongoose");
const { Schema} = mongoose;

const Paciente = new Schema({
    title: String,
    description: String
});

module.exports = mongoose.model("Paciente", Paciente);