const express = require ('express');
const router = express.Router();

const Paciente = require('../models/paciente');

router.get('/', async (req, res) => {
    const pacientes = await Paciente.find();
    //res.json(pacientes);
    console.log(pacientes);
});

module.exports = router;

