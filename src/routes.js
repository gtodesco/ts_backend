const express = require('express');
const EquipeController = require('./controllers/EquipeController');
const PessoaController = require('./controllers/PessoaController');
const SprintController = require('./controllers/SprintController');
const AtividadeController = require('./controllers/AtividadeController');
const ImpedimentoController = require('./controllers/ImpedimentoController');

const routes = express.Router();

routes.get('/equipe', EquipeController.getEquipes);
routes.post('/equipe', EquipeController.criarEquipe);
routes.put('/equipe', EquipeController.alterarEquipe);
routes.delete('/equipe', EquipeController.removerEquipe);
routes.post('/equipe/add-pessoa', EquipeController.addPessoaEquipe);
routes.get('/equipe/get-pessoas-equipe', EquipeController.getPessoasEquipe);
routes.delete('/equipe/remover-pessoa', EquipeController.removePessoaEquipe);

routes.get('/pessoa', PessoaController.getPessoas);
routes.post('/pessoa', PessoaController.criarPessoa);
routes.put('/pessoa', PessoaController.alterarPessoa);
routes.delete('/pessoa', PessoaController.removerPessoa);
routes.get('/pessoa/verifica-login', PessoaController.verificaLoginUnico);
routes.get('/pessoa/get-equipes-pessoa', PessoaController.getEquipesPessoa);
routes.get('/pessoa/get-atividades-pessoa', PessoaController.getAtividadesPessoa);

routes.get('/sprint', SprintController.getSprints);
routes.post('/sprint', SprintController.criarSprint);
routes.put('/sprint', SprintController.alterarSprint);
routes.delete('/sprint', SprintController.removerSprint);

routes.get('/atividade/get-atividade-equipe', AtividadeController.getAtividadesEquipe);
routes.get('/atividade/get-atividade-equipe-sem-sprint', AtividadeController.getAtividadesEquipeSemSprint);
routes.get('/atividade/get-atividade-sprint', AtividadeController.getAtividadesSprint);
routes.post('/atividade', AtividadeController.criarAtividade);
routes.put('/atividade', AtividadeController.alterarAtividade);
routes.delete('/atividade', AtividadeController.removerAtividade);
routes.put('/atividade/add-atividades-sprint', AtividadeController.addAtividadesSprint);
routes.post('/atividade/add-pessoa', AtividadeController.addPessoaAtividade);
routes.get('/atividade/get-pessoas-atividade', AtividadeController.getPessoasAtividade);
routes.delete('/atividade/remover-pessoa', AtividadeController.removePessoaAtividade);

routes.get('/impedimento/get-impedimentos-sprint', ImpedimentoController.getImpedimentosSprint);
routes.get('/impedimento/get-impedimentos-pessoa', ImpedimentoController.getImpedimentosPessoa);
routes.post('/impedimento', ImpedimentoController.criarImpedimento);
routes.put('/impedimento', ImpedimentoController.alterarImpedimento);
routes.delete('/impedimento', ImpedimentoController.removerImpedimento);

// Método teste
routes.get('/', (req, res) => {
    return res.json('Team Stats');
});

module.exports = routes;