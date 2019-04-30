const express = require ('express');
const router = express.Router();

const Ficha = require('../models/ficha');

/* router.get('/:id_paciente', async (req, res) => {
    //console.log(req.params.id_paciente)
    const count = await Ficha.find({id_paciente: req.params.id_paciente}).countDocuments();
    res.json(count);
}); */

router.get('/:id_paciente', async (req, res) => {
    //console.log(req.params.id_paciente)
    const fichas = await Ficha.find({id_paciente: req.params.id_paciente, estado: 'Generada'});
    res.json(fichas);
    console.log("Ficha  ==>" + fichas);
});

router.get('/activa/:id_paciente', async (req, res) => {
    const ficha = await Ficha.find({id_paciente: req.params.id_paciente, estado: "Generada"});
    console.log(ficha);
    res.json(ficha);
});

router.post('/', async (req, res) => {
    const ficha = new Ficha(req.body);
    await ficha.save();
    res.json({
        status: 'Ficha guardada'
    });
});

router.put('/:id', async (req, res) => {
    await Ficha.findOneAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Ficha actualizado'
    });
});

module.exports = router;