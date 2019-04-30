const express = require ('express');
const router = express.Router();

const Turno = require('../models/turno');
const filas_pares = [2,4,6,8,10,12,14,16,18,20,22,24,26,28];
const filas_nones = [1,3,5,7,9,11,13,15,17,19,21,23,25,27];

router.get('/filter/:fecha_turno', async (req, res) => {
    //const turnos = await Turno.find();
    console.log(req.params.id)
    const turnos = await Turno.find({fecha_turno: req.params.fecha_turno});
    res.json(turnos);
});

router.get('/paresm/:fecha_turno', async (req, res) => {
    //const turnos = await Turno.find();
    //console.log('fecha Turno: ' + req.params.fecha_turno+ "  Tipo Turno: " +  req.params.tipo_turno);
    const turnos = await Turno.find({fecha_ref: req.params.fecha_turno, orden:{ $in: filas_pares},
                                     tipo_turno: "Mañana"}).sort({orden:1});
    res.json(turnos);
});

router.get('/nonesm/:fecha_turno', async (req, res) => {
    //const turnos = await Turno.find();
    //console.log(req.params.id)
    const turnos = await Turno.find({fecha_ref: req.params.fecha_turno, orden:{ $in: filas_nones}, 
                                     tipo_turno: "Mañana"}).sort({orden:1});
    res.json(turnos);
});

router.get('/count/:fecha_turno', async (req, res) => {
    console.log('request:' + req.fecha_turno)
    const count = await Turno.find({fecha_turno: req.params.fecha_turno}).limit(1).countDocuments();
    res.json(count);
});

router.get('/diurno/:fecha_turno', async (req, res) => {
    console.log('request:' + req.params.fecha_turno)
    const count = await Turno.find({fecha_ref: req.params.fecha_turno, 
                                    orden_turno: '9001'}).countDocuments();
    res.json(count);
});

router.get('/tarde/:fecha_turno', async (req, res) => {
    console.log('request:' + req.params.fecha_turno)
    const count = await Turno.find({fecha_ref: req.params.fecha_turno, 
                                    orden_turno: '16001'}).countDocuments();
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
    console.log("Parametros: "+req.params.id)
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