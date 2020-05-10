const Sprint = require('../models/Sprint');

module.exports = {

    async getSprints(req, res) {

        const { equipe_id } = req.query;

        const sprints = await Sprint.findAll({
            where: { equipe_id },
            order: [
                ['sn_ativa', 'DESC'],
                ['dt_fim', 'DESC']
            ]
        });

        return res.json(sprints);
    },

    async criarSprint(req, res) {
        try {
            const {
                equipe_id,
                numero,
                dt_inicio,
                dt_fim,
                sn_ativa
            } = req.body;
    
            const sprint = await Sprint.create({
                equipe_id,
                numero,
                dt_inicio,
                dt_fim,
                sn_ativa
            });

            return res.json({
                msg: 'Sprint cadastrada com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível cadastrar a sprint.',
                status: false
            });
        }
    },

    async alterarSprint(req, res) {

        try {
            const {
                id,
                equipe_id,
                numero,
                dt_inicio,
                dt_fim,
                sn_ativa
            } = req.body;
    
            const newSprint = await Sprint.update({
                equipe_id,
                numero,
                dt_inicio,
                dt_fim,
                sn_ativa
            },
            {
                where: { id }
            });
    
            return res.json({
                msg: 'Sprint editada com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível editar a sprint.',
                status: false
            });
        }
    },

    async removerSprint(req, res) {
        try {
            const{ id } = req.body;

            await Sprint.destroy({
                where: { id }
            });
    
            return res.json({
                msg: 'Sprint excluída com sucesso!', 
                status:true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível excluir a sprint.',
                status: false
            });
        }
    },

};