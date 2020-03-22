const Status = require('../models/Status');

module.exports = {

    async getStatus(req, res) {
        const status = await Status.findAll();

        return res.json(status);
    },

};