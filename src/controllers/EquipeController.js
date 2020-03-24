const Equipe = require('../models/Equipe');

module.exports = {

    async getEquipes(req, res) {
        const equipes = await Equipe.findAll();

        return res.json(equipes);
    },

    async criarEquipe(req, res) {
        try {
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
    
            return res.json({
                msg: 'Equipe cadastrada com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível cadastrar a equipe.',
                status: false
            });
        }
    },

    async alterarEquipe(req, res) {

        try {
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
            },
            {
                where: { id }
            });
    
            return res.json({
                msg: 'Equipe editada com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível editar a equipe.',
                status: false
            });
        }
    },

    async removerEquipe(req, res) {
        try {
            const{ id } = req.body;

            Equipe.destroy({
                where: { id }
            });
    
            return res.json({
                msg: 'Equipe excluída com sucesso!', 
                status:true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível excluir a equipe.',
                status: false
            });
        }
    }

};