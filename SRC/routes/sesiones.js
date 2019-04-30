const express = require ('express');
const router = express.Router();

const Sesion = require('../models/sesion');

router.get('/:id_ficha', async (req, res) => {
    //console.log(req.params.id)
    const sesion = await Sesion.find({id_ficha: req.params.id_ficha});
    res.json(sesion);
});

router.get('/count/:id_ficha', async (req, res) => {
    //console.log(req.params.id)
    const count = await Sesion.find({id_ficha: req.params.id_ficha, estado: 'Realizada'}).countDocuments();
    res.json(count);
    console.log("Cantidad Ses. = " + count);
});

router.post('/', async (req, res) => {
    const sesion = new Sesion(req.body);
    await sesion.save();
    res.json({
        status: 'Sesion guardada'
    });
});

module.exports = router;