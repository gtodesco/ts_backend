const { literal } = require('sequelize');
const Impedimento = require('../models/Impedimento');

module.exports = {
    async getBurndown(req, res) {

        const { sprint_id } = req.query;

        return res.json('burndown ' + sprint_id);
    },

    async getImpedimentos(req, res) {
        try {

            const { sprint_id } = req.query;

            let arrImpedimentos = await Impedimento.findAll({
                attributes: [
                    'id', 
                    [literal('TIME_FORMAT(SEC_TO_TIME(SUM(TIME_TO_SEC(`horas`)) MOD (TIME_TO_SEC("838:59:59")+1)), "%H:%i")'), 'total']
                ],
                where: { sprint_id },
                include: {
                    association: 'pessoa',
                    attributes: ['nome']
                },
                group: ['pessoa_id'],
                order: literal('total DESC'),
            });
    
            let arrNomes = [];
            let arrHoras = [];

            for (i = 0; i < arrImpedimentos.length; i++) {
                arrNomes.push(arrImpedimentos[i].pessoa.nome);
                arrHoras.push(arrImpedimentos[i].get('total'));
            };

            const retorno = {
                'nomes': arrNomes,
                'horas': arrHoras
            };

            return res.json(retorno);

        } catch(e) {
            return res.json({
                'msg': 'Não foi possível buscar os impedimentos.',
                'status': false
            });
        }

    },

}