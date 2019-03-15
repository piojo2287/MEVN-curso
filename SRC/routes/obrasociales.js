const express = require ('express');
const router = express.Router();

const ObraSocial = require('../models/obrasocial');

router.get('/', async (req, res) => {
    const obrasociales = await ObraSocial.find();
    res.json(obrasociales);
});

router.get('/:id', async (req, res) => {
    const obrasocial = await ObraSocial.findById(req.params.id);
    res.json(obrasocial);
});

router.post('/', async (req, res) => {
    const obrasocial = new ObraSocial(req.body);
    await obrasocial.save();
    res.json({
        status: 'OS guardada'
    });
});

router.put('/:id', async (req, res) => {
    await ObraSocial.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'OS actualizada'
    });
});

router.delete('/:id', async (req, res) => {
    await ObraSocial.findByIdAndRemove(req.params.id);
    res.json({
        status: 'OS borrada'
    });
});

module.exports = router;