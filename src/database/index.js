const Sequelize = require('sequelize');
const dbConfig = require('../config/database');

// Importa models
const Atividade      = require('../models/Atividade');
const Equipe         = require('../models/Equipe');
const EquipesPessoas = require('../models/EquipesPessoas');
const Impedimento    = require('../models/Impedimento');
const Pessoa         = require('../models/Pessoa');
const Retrospectiva  = require('../models/Retrospectiva');
const Sprint         = require('../models/Sprint');
const Status         = require('../models/Status');
const TipoAtividade  = require('../models/TipoAtividade');

// Inicia conexão
const connection = new Sequelize(dbConfig);

// Inicia models
Atividade.init(connection);
Equipe.init(connection);
EquipesPessoas.init(connection);
Impedimento.init(connection);
Pessoa.init(connection);
Retrospectiva.init(connection);
Sprint.init(connection);
Status.init(connection);
TipoAtividade.init(connection);

// Realiza associações
Atividade.associate(connection.models);
Equipe.associate(connection.models);
Impedimento.associate(connection.models);
Pessoa.associate(connection.models);
Retrospectiva.associate(connection.models);
Sprint.associate(connection.models);

module.exports = connection;