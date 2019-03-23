const express = require('express');
const router = express.Router();

const Tratamiento = require('../models/tratamiento');

router.get('/', async (req, res) => {
    const tratamientos = await Tratamiento.find();
    res.json(tratamientos);
});

router.get('/:id', async (req, res) => {
    const tratamiento = await Tratamiento.findById(req.params.id);
    res.json(tratamiento);
});

router.post('/', async (req, res) => {
    const tratamiento = new Tratamiento(req.body);
    await tratamiento.save();
    res.json({
        status: 'Tratamiento guardado'
    });
});

router.put('/:id', async (req, res) => {
    await Tratamiento.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Tratamiento actualizado'
    });
});

router.delete('/:id', async (req, res) => {
    await Tratamiento.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Tratamiento borrado'
    });
});

module.exports = router;