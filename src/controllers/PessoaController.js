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

    async criarPessoa(req, res) {
        try {
            const {
                nome,
                email,
                dt_nascimento,
                sn_scrummaster,
                sn_empresa,
                login,
                senha
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
                dt_nascimento,
                sn_scrummaster,
                sn_empresa,
                login,
                senha
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
                dt_nascimento,
                sn_scrummaster,
                sn_empresa,
                login,
                senha
            } = req.body;
    
            const newPessoa = Pessoa.update({
                nome,
                email,
                dt_nascimento,
                sn_scrummaster,
                sn_empresa,
                login,
                senha
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

    async removerPessoa(req, res) {
        try {
            const{ id } = req.body;

            Pessoa.destroy({
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

    async verificaLoginUnico(req, res) {
        try {

            const {
                login
            } = req.body;

            const pessoa = await Pessoa.count({
                where: { login }
            });
        
            if (pessoa > 0){
                return res.json({
                    msg: 'Este login já está sendo usado no momento e não está disponível.',
                    status: false
                });
            }
        
            return res.json({
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível validar o login.',
                status: false
            });
        }
    }

};