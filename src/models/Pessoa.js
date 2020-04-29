const { Model, DataTypes } = require('sequelize');
const EquipesPessoas = require('./EquipesPessoas');

class Pessoa extends Model {
    
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            senha: DataTypes.STRING,
            sn_verificado: DataTypes.BOOLEAN,
            cd_amazon: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.Equipe, {foreignKey: 'pessoa_id', through: EquipesPessoas, as: 'equipes'});
        this.belongsToMany(models.Atividade, {foreignKey: 'pessoa_id', through: 'pessoas_atividades', as: 'atividades'});
        this.hasMany(models.Impedimento, {foreignKey: 'pessoa_id', as: 'impedimentos'});
    }

}

module.exports = Pessoa;