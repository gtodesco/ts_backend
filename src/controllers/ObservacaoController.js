const Observacao = require('../models/Observacao');

module.exports = {

    async getObservacoes(req, res) {
        const observacoes = await Observacao.findAll();

        return res.json(observacoes);
    },

    async cadastrarObservacao(req, res) {
        const {
            descricao
        } = req.body;

        const observacao = await Observacao.create({
            descricao
        });

        return res.json(observacao);
    },

};