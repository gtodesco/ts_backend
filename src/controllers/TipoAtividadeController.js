const TipoAtividade = require('../models/TipoAtividade');

module.exports = {

    async getTipoAtividadesEquipe(req, res) {
        const { equipe_id } = req.query;

        const tiposAtividades = await TipoAtividade.findAll({
            where: { equipe_id }
        });

        return res.json(tiposAtividades);
    },

    async criarTipoAtividade(req, res) {
        try {
            const {
                equipe_id,
                descricao,
                color
            } = req.body;

            const tipoAtividade = await TipoAtividade.create({
                equipe_id,
                descricao,
                color
            });

            return res.json({
                msg: 'Tipo de atividade cadastrado com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível cadastrar o tipo de atividade.',
                status: false
            });
        }
    },

    async alterarTipoAtividade(req, res) {

        try {
            const {
                id,
                equipe_id,
                descricao,
                color
            } = req.body;
    
            const newTipoAtividade = await TipoAtividade.update({
                equipe_id,
                descricao,
                color
            },
            {
                where: { id }
            });
    
            return res.json({
                msg: 'Tipo de atividade editado com sucesso!', 
                status: true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível editar o tipo de atividade.',
                status: false
            });
        }
    },

    async removerTipoAtividade(req, res) {
        try {
            const{ id } = req.body;

            await TipoAtividade.destroy({
                where: { id }
            });
    
            return res.json({
                msg: 'Tipo de atividade excluído com sucesso!', 
                status:true
            });

        } catch(e) {
            return res.json({
                msg: 'Não foi possível excluir o tipo de atividade.',
                status: false
            });
        }
    },

};