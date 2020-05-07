const Pessoa = require('../models/Pessoa');

async function verificaEmailRepetido(email) {

    const pessoa = await Pessoa.count({
        where: { email }
    });

    if (pessoa > 0){
        return true;
    }

    return false;
}

module.exports = {

    async getPessoas(req, res) {
        const pessoas = await Pessoa.findAll();

        return res.json(pessoas);
    },

    async getPessoaByEmail(req, res) {
        try {
            const {
                email
            } = req.query;
    
            const pessoa = await Pessoa.findAll({
                where: { email },
                include: {
                    association: 'equipes',
                    through: { 
                        as: 'equipes_pessoas',
                        attributes: ['sn_scrummaster']
                    }                    
                }
            });
    
            return res.json(pessoa);

        } catch(e) {
            return res.json({
                msg: 'Não foi possível retornar a pessoa.',
                status: false
            });
        }
    },

    async getPessoaByCdAmazon(req, res) {
        try {
            const {
                cd_amazon
            } = req.query;
    
            const pessoa = await Pessoa.findAll({
                where: { cd_amazon },
            });
    
            return res.json(pessoa);

        } catch(e) {
            return res.json({
                msg: 'Não foi possível retornar a pessoa.',
                status: false
            });
        }
    },

    async criarPessoa(req, res) {
        try {
            const {
                nome,
                email,
                sn_verificado,
                cd_amazon
            } = req.body;
            
            const emailRepetido = await verificaEmailRepetido(email);

            if (emailRepetido) {
                return res.json({
                    msg: 'Este e-mail já está cadastrado na aplicação.',
                    status: false
                });
            }

            const pessoa = await Pessoa.create({
                nome,
                email,
                sn_verificado,
                cd_amazon
            });
    
            return res.json({
                msg: 'Pessoa cadastrada com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível cadastrar a pessoa.',
                status: false
            });
        }
    },

    async alterarPessoa(req, res) {

        try {
            const {
                id,
                nome,
                email,
                sn_verificado,
                cd_amazon
            } = req.body;
    
            const newPessoa = await Pessoa.update({
                nome,
                email,
                sn_verificado,
                cd_amazon
            },
            {
                where: { id }
            });
    
            return res.json({
                msg: 'Pessoa editada com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível editar a pessoa.',
                status: false
            });
        }
    },

    async alterarPessoaByEmail(req, res) {

        try {
            const {
                nome,
                email,
                sn_verificado,
                cd_amazon
            } = req.body;
    
            const newPessoa = await Pessoa.update({
                nome,
                email,
                sn_verificado,
                cd_amazon
            },
            {
                where: { email }
            });
    
            return res.json({
                msg: 'Pessoa editada com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível editar a pessoa.',
                status: false
            });
        }
    },

    async removerPessoa(req, res) {
        try {
            const{ id } = req.body;

            await Pessoa.destroy({
                where: { id }
            });
    
            return res.json({
                msg: 'Pessoa excluída com sucesso!', 
                status:true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível excluir a pessoa.',
                status: false
            });
        }
    },

    async verificaEmailUnico(req, res) {
        try {

            const {
                email
            } = req.body;

            const pessoa = await Pessoa.count({
                where: { email }
            });
        
            if (pessoa > 0){
                return res.json({
                    msg: 'Este e-mail já está sendo usado no momento e não está disponível.',
                    status: false
                });
            }
        
            return res.json({
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível validar o e-mail.',
                status: false
            });
        }
    },

    async getEquipesPessoa(req, res) {
        try {
            const {
                cd_amazon
            } = req.query;
    
            const pessoa = await Pessoa.findAll({
                include: {
                    association: 'equipes',
                    through: { 
                        as: 'equipes_pessoas',
                        attributes: ['sn_scrummaster'],
                    }             
                },
                where: { cd_amazon },
                order: [
                    ['equipes', 'sn_ativa', 'DESC'],
                ] 
            });
    
            return res.json(pessoa);
        } catch (e) {
            return res.json({
                msg: 'Não foi buscar as equipes.',
                status: false
            });
        }
    },

    async getAtividadesPessoa(req, res) {
        const {
            pessoa_id
        } = req.body;

        const pessoa = await Pessoa.findByPk(pessoa_id, {
            include: {
                association: 'atividades',
                attributes: ['id', 'titulo'],
                through: { 
                    attributes: []
                }                    
            }
        });

        return res.json(pessoa);
    },

};