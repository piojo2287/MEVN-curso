const express = require('express');
const router = express.Router();

const Paciente = require('../models/paciente');

router.get('/', async (req, res) => {
    const pacientes = await Paciente.find();
    res.json(pacientes);
});

router.post('/', async (req, res) => {
    const paciente = new Paciente(req.body);
    await paciente.save();
    res.json({
        status: "paciente guardado"
    });
});

router.put('/:id', async (req, res) => {
    await Paciente.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: "paciente actualizado"
    });
});

router.delete('/:id', async (req, res) => {
    await Paciente.findByIdAndRemove(req.params.id);
    res.json({
        status: "paciente eliminado"
    });
});





module.exports = router;

