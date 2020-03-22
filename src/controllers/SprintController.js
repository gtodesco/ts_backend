const Sprint = require('../models/Sprint');

module.exports = {

    async getSprints(req, res) {
        const sprints = await Sprint.findAll();

        return res.json(sprints);
    },

    async cadastrarSprint(req, res) {
        const {
            numero,
            dt_inicio,
            dt_fim,
            sn_ativa
        } = req.body;

        const sprint = await Sprint.create({
            numero,
            dt_inicio,
            dt_fim,
            sn_ativa
        });

        return res.json(sprint);
    },

};