const Observacao = require('../models/Observacao');

module.exports = {

    async getObservacoesAtividade(req, res) {
        const { atividade_id } = req.body;

        const observacoes = await Observacao.findAll({
            where: { atividade_id }
        });

        return res.json(observacoes);
    },

    async criarObservacao(req, res) {
        try {
            const {
                atividade_id,
                descricao
            } = req.body;

            const observacao = await Observacao.create({
                atividade_id,
                descricao
            });

            return res.json({
                msg: 'Observação cadastrada com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível cadastrar a observação.',
                status: false
            });
        }
    },

    async alterarObservacao(req, res) {

        try {
            const {
                id,
                atividade_id,
                descricao
            } = req.body;
    
            const newObservacao = await Observacao.update({
                atividade_id,
                descricao
            },
            {
                where: { id }
            });
    
            return res.json({
                msg: 'Observação editada com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível editar a observação.',
                status: false
            });
        }
    },

    async removerObservacao(req, res) {
        try {
            const{ id } = req.body;

            await Observacao.destroy({
                where: { id }
            });
    
            return res.json({
                msg: 'Observação excluída com sucesso!', 
                status:true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível excluir a observação.',
                status: false
            });
        }
    },
};