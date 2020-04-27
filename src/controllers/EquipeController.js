const Equipe = require('../models/Equipe');
const Pessoa = require('../models/Pessoa');

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
    
            const newEquipe = await Equipe.update({
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

            await Equipe.destroy({
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
    },

    async addPessoaEquipe(req, res) {
        try {
            const {
                equipe_id,
                pessoa_id,
                sn_scrummaster
            } = req.body;
    
            const equipe = await Equipe.findByPk(equipe_id);
            const pessoa = await Pessoa.findByPk(pessoa_id);
    
            await equipe.addPessoa(pessoa, {sn_scrummaster});
    
            return res.json({
                msg: "Pessoa adicionada com sucesso!",
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível adicionar a pessoa à equipe.',
                status: false
            });
        }
    },

    async alterarPessoasEquipe(req, res) {
        try {
            const {
                equipe_id,
                pessoa_id,
                sn_scrummaster
            } = req.body;
    
            const equipe = await Equipe.findByPk(equipe_id);
            const pessoa = await Pessoa.findByPk(pessoa_id);
    
            await equipe.setPessoa(pessoa, {sn_scrummaster});
    
            return res.json({
                msg: "Pessoa alterada para Scrum-Master com sucesso!",
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível alterar.',
                status: false
            });
        } 
    },

    async getPessoasEquipe(req, res) {
        const {
            equipe_id
        } = req.body;

        const equipe = await Equipe.findByPk(equipe_id, {
            include: {
                association: 'pessoas',
                attributes: ['id', 'nome'],
                through: { 
                    attributes: []
                }                    
            }
        });

        return res.json(equipe);
    },

    async removePessoaEquipe(req, res) {
        try {
            const {
                equipe_id,
                pessoa_id
            } = req.body;

            const equipe = await Equipe.findByPk(equipe_id);
            const pessoa = await Pessoa.findByPk(pessoa_id);
    
            await equipe.removePessoa(pessoa);
    
            return res.json({
                msg: "Pessoa removida com sucesso!",
                status: true
            });

        } catch (e) {
            return res.json({
                msg: 'Não foi possível remover a pessoa da equipe.',
                status: false
            });
        }
    }

};