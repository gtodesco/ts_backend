const express = require('express');
const EquipeController = require('./controllers/EquipeController');
const PessoaController = require('./controllers/PessoaController');

const routes = express.Router();

routes.get('/equipe', EquipeController.getEquipes);
routes.post('/equipe', EquipeController.criarEquipe);
routes.put('/equipe', EquipeController.alterarEquipe);
routes.delete('/equipe', EquipeController.removerEquipe);
routes.post('/equipe/add-pessoa', EquipeController.addPessoaEquipe);
routes.get('/equipe/get-equipe-pessoas', EquipeController.getPessoasEquipes);
routes.delete('/equipe/remover-pessoa', EquipeController.removePessoaEquipe);

routes.get('/pessoa', PessoaController.getPessoas);
routes.post('/pessoa', PessoaController.criarPessoa);
routes.put('/pessoa', PessoaController.alterarPessoa);
routes.delete('/pessoa', PessoaController.removerPessoa);
routes.get('/pessoa/verifica-login', PessoaController.verificaLoginUnico);

// Método teste
routes.get('/', (req, res) => {
    return res.json('Team Stats');
});

module.exports = routes;