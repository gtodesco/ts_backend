const Atividade = require('../models/Atividade');
const Equipe = require('../models/Equipe');

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
            horas_realizado,
            equipe_id
        } = req.body;

        const equipe = await Equipe.findByPk(equipe_id);

        if (!equipe) {
            return res.status(400).json({ error: 'Equipe não existe.' });
        }

        const atividade = await Atividade.create({
            titulo,
            descricao,
            horas_previsto,
            horas_realizado
        });

        await Equipe.addAtividade(atividade);

        return res.json(atividade);
    },

};