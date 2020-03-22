const Equipe = require('../models/Equipe');

module.exports = {

    async getEquipes(req, res) {
        const equipes = await Equipe.findAll();

        return res.json(equipes);
    },

    async cadastrarEquipe(req, res) {
        const {
            nome,
            dt_ativacao,
            dt_desativacao,
            sn_ativa
        } = req.body;

        const equipe = await Equipe.create({
            nome,
            dt_ativacao,
            dt_desativacao,
            sn_ativa
        });

        return res.json(equipe);
    },

};