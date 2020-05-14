const Atividade = require('../models/Atividade');
const Pessoa = require('../models/Pessoa');

module.exports = {

    async getAtividadesEquipe(req, res) {
        const { equipe_id } = req.query;

        const atividades = await Atividade.findAll({
            include: [
                { association: 'status' },
                { association: 'tipos_atividade' }
            ],
            where: { equipe_id }
        });

        return res.json(atividades);
    },

    async getAtividadesEquipeSemSprint(req, res) {
        const { equipe_id, tipo_id } = req.query;

        let objWhere = {
            equipe_id,
            sprint_id: null
        }

        // Se informou tipo de atividade, filtra por ele também
        if (tipo_id != null) {
            objWhere['tipo_id'] = tipo_id;
        }

        const atividades = await Atividade.findAll({
            include: [
                { association: 'status' },
                { association: 'tipos_atividade' },
                {
                    association: 'pessoas',
                    attributes: ['id', 'nome'],
                    through: { 
                        attributes: []
                    } 
                }  
            ],
            where: objWhere,
            order: [
                ['prioridade', 'DESC'],
            ] 
        });

        return res.json(atividades);
    },

    async getAtividadesSprint(req, res) {
        const { sprint_id } = req.query;

        const atividades = await Atividade.findAll({
            include: [
                { association: 'status' },
                { association: 'tipos_atividade' }
            ],
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
                prioridade,
                horas_previsto,
                horas_realizado,
                pessoas
            } = req.body;
    
            const atividade = await Atividade.create({
                equipe_id,
                sprint_id,
                tipo_id,
                status_id,
                titulo,
                descricao,
                prioridade,
                horas_previsto,
                horas_realizado
            });

            // Adiciona pessoas na atividade
            pessoas.forEach(async (pessoa_id) => {
                const pessoaAdd = await Pessoa.findByPk(pessoa_id);
                await atividade.addPessoa(pessoaAdd);
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
                prioridade,
                horas_previsto,
                horas_realizado,
                pessoas
            } = req.body;
    
            const newAtividade = await Atividade.update({
                equipe_id,
                sprint_id,
                tipo_id,
                status_id,
                titulo,
                descricao,
                prioridade,
                horas_previsto,
                horas_realizado
            },
            {
                where: { id }
            });

            // Irá alterar pessoas apenas se o valor for enviado
            if (pessoas) {

                // Busca as pessoas já cadastradas da atividade
                const atividade_pessoas = await Atividade.findByPk(id, {
                    include: {
                        association: 'pessoas',
                    },
                });

                const pessoas_atual = atividade_pessoas.pessoas;

                /**
                 * Remove todas as pessoas atuais da atividade e adiciona novamente
                 */

                // pessoas_atual: array de objetos
                for (i = 0; i < pessoas_atual.length; i++) {
                    let pessoaRemove = await Pessoa.findByPk(pessoas_atual[i].id);
                    await atividade_pessoas.removePessoa(pessoaRemove);
                }

                // pessoas: array de integers
                for (i = 0; i < pessoas.length; i++) {

                    let pessoaFind;

                    if (typeof pessoas[i] == 'object') {
                        pessoaFind = pessoas[i].id;
                    }
                    else {
                        pessoaFind = pessoas[i];
                    }

                    let pessoaAdd = await Pessoa.findByPk(pessoaFind);
                    await atividade_pessoas.addPessoa(pessoaAdd);
                }
            }

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