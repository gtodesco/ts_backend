const Retrospectiva = require('../models/Retrospectiva');

module.exports = {

    async getRetrospectivasSprint(req, res) {
        const { sprint_id } = req.body;

        const retrospectivas = await Retrospectiva.findAll({
            where: { sprint_id }
        });

        return res.json(retrospectivas);
    },

    async criarRetrospectiva(req, res) {
        try {
            const {
                sprint_id,
                start,
                stop,
                continuar
            } = req.body;

            const retrospectiva = await Retrospectiva.create({
                sprint_id,
                start,
                stop,
                continuar
            });

            return res.json({
                msg: 'Retrospectiva cadastrada com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível cadastrar a retrospectiva.',
                status: false
            });
        }
    },

    async alterarRetrospectiva(req, res) {

        try {
            const {
                id,
                sprint_id,
                start,
                stop,
                continuar
            } = req.body;
    
            const newRetrospectiva = await Retrospectiva.update({
                sprint_id,
                start,
                stop,
                continuar
            },
            {
                where: { id }
            });
    
            return res.json({
                msg: 'Retrospectiva editada com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível editar a retrospectiva.',
                status: false
            });
        }
    },

    async removerRetrospectiva(req, res) {
        try {
            const{ id } = req.body;

            await Retrospectiva.destroy({
                where: { id }
            });
    
            return res.json({
                msg: 'Retrospectiva excluída com sucesso!', 
                status:true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível excluir a retrospectiva.',
                status: false
            });
        }
    },
};