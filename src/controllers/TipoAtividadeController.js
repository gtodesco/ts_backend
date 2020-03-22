const TipoAtividade = require('../models/TipoAtividade');

module.exports = {

    async getTipoAtividades(req, res) {
        const tipoAtividades = await TipoAtividade.findAll();

        return res.json(tipoAtividades);
    },

};