const Pessoa = require('../models/Pessoa');

module.exports = {

    async getPessoas(req, res) {
        const pessoas = await Pessoa.findAll();

        return res.json(pessoas);
    },

    async cadastrarPessoa(req, res) {
        const {
            nome,
            email,
            dt_nascimento,
            sn_scrummaster,
            sn_empresa,
            login,
            senha
        } = req.body;

        const pessoa = await User.create({
            nome,
            email,
            dt_nascimento,
            sn_scrummaster,
            sn_empresa,
            login,
            senha
        });

        return res.json(pessoa);
    },

};