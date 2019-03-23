const express = require ('express');
const router = express.Router();

const Turno = require('../models/turno');

router.get('/filter/:id', async (req, res) => {
    //const turnos = await Turno.find();
    console.log(req.params.id)
    const turnos = await Turno.find({id_paciente: req.params.id});
    res.json(turnos);
});

router.get('/:id', async (req, res) => {
    const turno = await Turno.findById(req.params.id);
    res.json(turno);
});

router.post('/', async (req, res) => {
    const turno = new Turno(req.body);
    await turno.save();
    res.json({
        status: 'Turno guardado'
    });
});

router.put('/:id', async (req, res) => {
    await Turno.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Turno actualizado'
    });
});

router.delete('/:id', async (req, res) => {
    await Turno.findByIdAndRemove(req.params.id);
    res.json({
        status: 'Turno borrado'
    });
});

module.exports = router;

