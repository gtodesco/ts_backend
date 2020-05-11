const express = require('express');
const EquipeController = require('./controllers/EquipeController');
const PessoaController = require('./controllers/PessoaController');
const SprintController = require('./controllers/SprintController');
const AtividadeController = require('./controllers/AtividadeController');
const ImpedimentoController = require('./controllers/ImpedimentoController');
const RetrospectivaController = require('./controllers/RetrospectivaController');
const ObservacaoController = require('./controllers/ObservacaoController');
const StatusController = require('./controllers/StatusController');
const TipoAtividadeController = require('./controllers/TipoAtividadeController');

const routes = express.Router();

routes.get('/equipe', EquipeController.getEquipes);
routes.post('/equipe', EquipeController.criarEquipe);
routes.put('/equipe', EquipeController.alterarEquipe);
routes.delete('/equipe', EquipeController.removerEquipe);
routes.post('/equipe/pessoa', EquipeController.addPessoaEquipe);
routes.get('/equipe/pessoa', EquipeController.getPessoasEquipe);
routes.delete('/equipe/pessoa', EquipeController.removePessoaEquipe);

routes.get('/pessoa', PessoaController.getPessoas);
routes.post('/pessoa', PessoaController.criarPessoa);
routes.put('/pessoa', PessoaController.alterarPessoa);
routes.put('/pessoa-email', PessoaController.alterarPessoaByEmail);
routes.delete('/pessoa', PessoaController.removerPessoa);
routes.get('/pessoa/verifica-email', PessoaController.verificaEmailUnico);
routes.get('/pessoa/get-equipes-pessoa', PessoaController.getEquipesPessoa);
routes.get('/pessoa/get-atividades-pessoa', PessoaController.getAtividadesPessoa);
routes.get('/pessoa/get-pessoa', PessoaController.getPessoaByCdAmazon);
routes.get('/pessoa/get-pessoa-email', PessoaController.getPessoaByEmail);

routes.get('/sprint', SprintController.getSprints);
routes.post('/sprint', SprintController.criarSprint);
routes.put('/sprint', SprintController.alterarSprint);
routes.delete('/sprint', SprintController.removerSprint);
routes.get('/sprint-ativa', SprintController.getSprintAtiva);

routes.get('/atividade/get-atividade-equipe', AtividadeController.getAtividadesEquipe);
routes.get('/atividade/get-atividade-equipe-sem-sprint', AtividadeController.getAtividadesEquipeSemSprint);
routes.get('/atividade/get-atividade-sprint', AtividadeController.getAtividadesSprint);
routes.post('/atividade', AtividadeController.criarAtividade);
routes.put('/atividade', AtividadeController.alterarAtividade);
routes.delete('/atividade', AtividadeController.removerAtividade);
routes.post('/atividade/add-atividades-sprint', AtividadeController.addAtividadesSprint);
routes.post('/atividade/pessoa', AtividadeController.addPessoaAtividade);
routes.get('/atividade/pessoa', AtividadeController.getPessoasAtividade);
routes.delete('/atividade/pessoa', AtividadeController.removePessoaAtividade);

routes.get('/impedimento/get-impedimentos-sprint', ImpedimentoController.getImpedimentosSprint);
routes.get('/impedimento/get-impedimentos-pessoa', ImpedimentoController.getImpedimentosPessoa);
routes.post('/impedimento', ImpedimentoController.criarImpedimento);
routes.put('/impedimento', ImpedimentoController.alterarImpedimento);
routes.delete('/impedimento', ImpedimentoController.removerImpedimento);

routes.get('/retrospectiva', RetrospectivaController.getRetrospectivasSprint);
routes.post('/retrospectiva', RetrospectivaController.criarRetrospectiva);
routes.put('/retrospectiva', RetrospectivaController.alterarRetrospectiva);
routes.delete('/retrospectiva', RetrospectivaController.removerRetrospectiva);

routes.get('/observacao', ObservacaoController.getObservacoesAtividade);
routes.post('/observacao', ObservacaoController.criarObservacao);
routes.put('/observacao', ObservacaoController.alterarObservacao);
routes.delete('/observacao', ObservacaoController.removerObservacao);

routes.get('/status', StatusController.getStatus);

routes.get('/tipo-atividade', TipoAtividadeController.getTipoAtividadesEquipe);
routes.post('/tipo-atividade', TipoAtividadeController.criarTipoAtividade);
routes.put('/tipo-atividade', TipoAtividadeController.alterarTipoAtividade);
routes.delete('/tipo-atividade', TipoAtividadeController.removerTipoAtividade);

// Método teste
routes.get('/', (req, res) => {
    return res.json('Team Stats');
});

module.exports = routes;