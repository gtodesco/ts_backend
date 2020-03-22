const Atividade = require('../models/Atividade');

module.exports = {

    async getAtividades(req, res) {
        const atividades = await Atividade.findAll();

        return res.json(atividades);
    },

    async cadastrarAtividade(req, res) {
        const {
            titulo,
            descricao,
            horas_previsto,
            horas_realizado
        } = req.body;

        const atividade = await Atividade.create({
            titulo,
            descricao,
            horas_previsto,
            horas_realizado
        });

        return res.json(atividade);
    },

};