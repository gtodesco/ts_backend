const Atividade = require('../models/Atividade');
const Pessoa = require('../models/Pessoa');

module.exports = {

    async getAtividadesEquipe(req, res) {
        const { equipe_id } = req.body;

        const atividades = await Atividade.findAll({
            include: { association: 'status' },
            where: { equipe_id }
        });

        return res.json(atividades);
    },

    async getAtividadesEquipeSemSprint(req, res) {
        const { equipe_id } = req.body;

        const atividades = await Atividade.findAll({
            include: { association: 'status' },
            where: { equipe_id, sprint_id: null }
        });

        return res.json(atividades);
    },

    async getAtividadesSprint(req, res) {
        const { sprint_id } = req.body;

        const atividades = await Atividade.findAll({
            include: { association: 'status' },
            where: { sprint_id }
        });

        return res.json(atividades);
    },

    async criarAtividade(req, res) {
        try {
            const {
                equipe_id,
                sprint_id,
                tipo_id,
                status_id,
                titulo,
                descricao,
                horas_previsto,
                horas_realizado
            } = req.body;
    
            const atividade = await Atividade.create({
                equipe_id,
                sprint_id,
                tipo_id,
                status_id,
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
                tipo_id,
                status_id,
                titulo,
                descricao,
                horas_previsto,
                horas_realizado
            } = req.body;
    
            const newAtividade = await Atividade.update({
                equipe_id,
                sprint_id,
                tipo_id,
                status_id,
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

    async addPessoaAtividade(req, res) {
        try {
            const {
                atividade_id,
                pessoa_id
            } = req.body;
    
            const atividade = await Atividade.findByPk(atividade_id);
            const pessoa = await Pessoa.findByPk(pessoa_id);
    
            await atividade.addPessoa(pessoa);
    
            return res.json({
                msg: "Pessoa adicionada com sucesso!",
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível adicionar a pessoa à atividade.',
                status: false
            });
        }
    },

    async getPessoasAtividade(req, res) {
        const {
            atividade_id
        } = req.body;

        const atividade = await Atividade.findByPk(atividade_id, {
            include: {
                association: 'pessoas',
                attributes: ['id', 'nome'],
                through: { 
                    attributes: []
                }                    
            }
        });

        return res.json(atividade);
    },

    async removePessoaAtividade(req, res) {
        try {
            const {
                atividade_id,
                pessoa_id
            } = req.body;

            const atividade = await Atividade.findByPk(atividade_id);
            const pessoa = await Pessoa.findByPk(pessoa_id);
    
            await atividade.removePessoa(pessoa);
    
            return res.json({
                msg: "Pessoa removida com sucesso!",
                status: true
            });

        } catch (e) {
            return res.json({
                msg: 'Não foi possível remover a pessoa da atividade.',
                status: false
            });
        }
    }

};