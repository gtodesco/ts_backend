const express = require('express');
const EquipeController = require('./controllers/EquipeController');

const routes = express.Router();

routes.get('/equipe', EquipeController.getEquipes);
routes.post('/equipe', EquipeController.criarEquipe);
routes.put('/equipe', EquipeController.alterarEquipe);
routes.delete('/equipe', EquipeController.removerEquipe);

// Método teste
routes.get('/', (req, res) => {
    return res.json('Team Stats');
});

module.exports = routes;