const TipoAtividade = require('../models/TipoAtividade');

module.exports = {

    async getTipoAtividades(req, res) {
        const tipoAtividades = await TipoAtividade.findAll();

        return res.json(tipoAtividades);
    },

    async criarTipoAtividade(req, res) {
        try {
            const {
                descricao
            } = req.body;

            const tipoAtividade = await TipoAtividade.create({
                descricao
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
                descricao
            } = req.body;
    
            const newTipoAtividade = await TipoAtividade.update({
                descricao
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