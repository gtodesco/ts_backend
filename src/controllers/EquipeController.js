const Equipe = require('../models/Equipe');

module.exports = {

    async getEquipes(req, res) {
        const equipes = await Equipe.findAll();

        return res.json(equipes);
    },

    async criarEquipe(req, res) {
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

    async alterarEquipe(req, res) {

        const {
            id,
            nome,
            dt_ativacao,
            dt_desativacao,
            sn_ativa
        } = req.body;

        const newEquipe = Equipe.update({
            nome,
            dt_ativacao,
            dt_desativacao,
            sn_ativa
        }
        ,{
            where: { id }
        });

        return res.json(newEquipe);
    },

    async removerEquipe(req, res) {
        try {
            const{ id } = req.body;

            Equipe.destroy({
                where: { id }
            });
    
            return res.json(true);

        } catch(e) {
            return res.json(false);
        }
    }

};