const Atividade = require('../models/Atividade');

module.exports = {

    async getAtividadesEquipe(req, res) {
        const { equipe_id } = req.body;

        const atividades = await Atividade.findAll({
            where: { equipe_id }
        });

        return res.json(atividades);
    },

    async getAtividadesEquipeSemSprint(req, res) {
        const { equipe_id } = req.body;

        const atividades = await Atividade.findAll({
            where: { equipe_id, sprint_id: null }
        });

        return res.json(atividades);
    },

    async getAtividadesSprint(req, res) {
        const { sprint_id } = req.body;

        const atividades = await Atividade.findAll({
            where: { sprint_id }
        });

        return res.json(atividades);
    },

    async criarAtividade(req, res) {
        try {
            const {
                equipe_id,
                sprint_id,
                titulo,
                descricao,
                horas_previsto,
                horas_realizado
            } = req.body;
    
            const atividade = await Atividade.create({
                equipe_id,
                sprint_id,
                titulo,
                descricao,
                horas_previsto,
                horas_realizado
            });
    
            return res.json({
                msg: 'Atividade cadastrada com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível cadastrar a atividade.',
                status: false
            });
        }
    },

    async alterarAtividade(req, res) {

        try {
            const {
                id,
                equipe_id,
                sprint_id,
                titulo,
                descricao,
                horas_previsto,
                horas_realizado
            } = req.body;
    
            const newAtividade = await Atividade.update({
                equipe_id,
                sprint_id,
                titulo,
                descricao,
                horas_previsto,
                horas_realizado
            },
            {
                where: { id }
            });
    
            return res.json({
                msg: 'Atividade editada com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível editar a atividade.',
                status: false
            });
        }
    },

    async removerAtividade(req, res) {
        try {
            const{ id } = req.body;

            await Atividade.destroy({
                where: { id }
            });
    
            return res.json({
                msg: 'Atividade excluída com sucesso!', 
                status:true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível excluir a atividade.',
                status: false
            });
        }
    },

    async addAtividadesSprint(req, res) {
        try {
            const { sprint_id, arrAtividades } = req.body;

            arrAtividades.forEach(async (id) => {
                await Atividade.update({
                    sprint_id,
                },
                {
                    where: { id }
                });
            });
    
            return res.json({
                msg: 'Atividades vinculadas à sprint!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível vincular as atividades à sprint.', 
                status: false
            });
        }
    },

};