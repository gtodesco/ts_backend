const { Model, DataTypes } = require('sequelize');

class Pessoa extends Model {
    
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            dt_nascimento: DataTypes.DATEONLY,
            sn_scrummaster: DataTypes.BOOLEAN,
            sn_empresa: DataTypes.BOOLEAN,
            login: DataTypes.STRING,
            senha: DataTypes.STRING
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.Equipe, {foreignKey: 'pessoa_id', through: 'equipes_pessoas', as: 'equipes'});
        this.belongsToMany(models.Atividade, {foreignKey: 'pessoa_id', through: 'pessoas_atividades', as: 'atividades'});
        this.hasMany(models.Impedimento, {foreignKey: 'pessoa_id', as: 'impedimentos'});
    }

}

module.exports = Pessoa;