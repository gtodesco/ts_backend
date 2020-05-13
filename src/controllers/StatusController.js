const Status = require('../models/Status');
const Atividade = require('../models/Atividade');

module.exports = {

    async getStatus(req, res) {
        const status = await Status.findAll();

        return res.json(status);
    },

    async getStatusAtividades(req, res) {
        try {
            
            // Busca os status
            const status = await Status.findAll();

            const { sprint_id } = req.query;

            // Busca as atividades
            const atividades = await Atividade.findAll({
                include: [
                    { association: 'tipos_atividade' },
                    {
                        association: 'pessoas',
                        attributes: ['id', 'nome'],
                        through: { 
                            attributes: []
                        } 
                    }  
                ],
                where: { sprint_id },
                order: [
                    ['prioridade', 'DESC'],
                ] 
            });

            for (i = 0; i < status.length; i++) {
                status[i]['atividades'] = [];
                atividades.forEach((atividade) => {
                    if (atividade.status_id == status[i].id) {
                        status[i].atividades.push(atividade);
                    }
                });
            }

            let status_atividades = [];
            
            status.forEach((status) => {
                status_atividades.push({
                    "id": status.id,
                    "descricao": status.descricao,
                    "created_at": status.created_at,
                    "updated_at": status.updated_at,
                    "atividades": status.atividades
                });
            })

            return res.json(status_atividades);

        } catch(e) {
            return res.json({
                msg: 'Não foi possível buscar as atividades.',
                status: false
            });
        }
    },

};