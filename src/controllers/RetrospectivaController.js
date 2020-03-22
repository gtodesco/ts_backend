const Retrospectiva = require('../models/Retrospectiva');

module.exports = {

    async getRetrospectivas(req, res) {
        const retrospectivas = await Retrospectiva.findAll();

        return res.json(retrospectivas);
    },

    async cadastrarRetrospectiva(req, res) {
        const {
            start,
            stop,
            continuar
        } = req.body;

        const retrospectiva = await Retrospectiva.create({
            start,
            stop,
            continuar
        });

        return res.json(retrospectiva);
    },

};