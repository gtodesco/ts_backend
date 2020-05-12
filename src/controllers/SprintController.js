const Sprint = require('../models/Sprint');
const Retrospectiva = require('../models/Retrospectiva');

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

    async getSprintAtiva(req, res) {
        const sprint = await Sprint.findAll({
            where: { sn_ativa: true },
        });

        return res.json(sprint);
    },

    async criarSprint(req, res) {
        try {

            // Verifica se existe uma sprint ativa. Se existir, encerra ela e cadastra a nova
            const sprint_ativa = await Sprint.findAll({
                where: {
                    sn_ativa: true
                }
            });

            if (sprint_ativa.length > 0) {
                await Sprint.update({
                    sn_ativa: false,
                },
                {
                    where: {
                        id: sprint_ativa[0].id
                    }
                });
            }

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

            // Cria retrospectiva com informações vazias para a sprint
            await Retrospectiva.create({
                sprint_id: sprint.id,
                start: '',
                stop: '',
                continuar: ''
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