const Impedimento = require('../models/Impedimento');

module.exports = {

    async getImpedimentosSprint(req, res) {
        const { sprint_id } = req.body;

        const impedimentos = await Impedimento.findAll({
            where: { sprint_id }
        });

        return res.json(impedimentos);
    },

    async getImpedimentosPessoa(req, res) {
        const { pessoa_id } = req.body;

        const impedimentos = await Impedimento.findAll({
            where: { pessoa_id }
        });

        return res.json(impedimentos);
    },

    async criarImpedimento(req, res) {
        try {
            const {
                pessoa_id,
                sprint_id,
                descricao,
                horas
            } = req.body;
    
            const impedimento = await Impedimento.create({
                pessoa_id,
                sprint_id,
                descricao,
                horas
            });
    
            return res.json({
                msg: 'Impedimento cadastrado com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível cadastrar o impedimento.',
                status: false
            });
        }
    },

    async alterarImpedimento(req, res) {

        try {
            const {
                id,
                pessoa_id,
                sprint_id,
                descricao,
                horas
            } = req.body;
    
            const newImpedimento = await Impedimento.update({
                pessoa_id,
                sprint_id,
                descricao,
                horas
            },
            {
                where: { id }
            });
    
            return res.json({
                msg: 'Impedimento editado com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível editar o impedimento.',
                status: false
            });
        }
    },

    async removerImpedimento(req, res) {
        try {
            const{ id } = req.body;

            await Impedimento.destroy({
                where: { id }
            });
    
            return res.json({
                msg: 'Impedimento excluído com sucesso!', 
                status:true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível excluir o impedimento.',
                status: false
            });
        }
    },
};