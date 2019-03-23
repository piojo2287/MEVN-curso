const express = require ('express');
const router = express.Router();

const Turno = require('../models/turno');

router.get('/filter/:fecha_turno', async (req, res) => {
    //const turnos = await Turno.find();
    console.log(req.params.id)
    const turnos = await Turno.find({fecha_turno: req.params.fecha_turno});
    res.json(turnos);
});

router.get('/count/:fecha_turno', async (req, res) => {
    console.log('request:' + req.fecha_turno)
    const count = await Turno.find({fecha_turno: req.params.fecha_turno}).limit(1).count();
    res.json(count);
});

router.get('/diurno/:fecha_turno', async (req, res) => {
    console.log('request:' + req.fecha_turno)
    const count = await Turno.find({fecha_turno: req.params.fecha_turno, 
                                    orden_turno: '9001'}).count();
    res.json(count);
});

router.get('/tarde/:fecha_turno', async (req, res) => {
    console.log('request:' + req.fecha_turno)
    const count = await Turno.find({fecha_turno: req.params.fecha_turno, 
                                    orden_turno: '16001'}).count();
    res.json(count);
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