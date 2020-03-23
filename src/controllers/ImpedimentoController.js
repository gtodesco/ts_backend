const Impedimento = require('../models/Impedimento');
const Sprint = require('../models/Sprint');
const Pessoa = require('../models/Pessoa');

module.exports = {

    async getImpedimentos(req, res) {
        const impedimentos = await Impedimento.findAll();

        return res.json(impedimentos);
    },

    async cadastrarImpedimento(req, res) {
        const {
            descricao,
            horas
        } = req.body;

        const impedimento = await Impedimento.create({
            descricao,
            horas
        });

        return res.json(impedimento);
    },

};