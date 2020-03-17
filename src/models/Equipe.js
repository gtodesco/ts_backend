const { Model, DataTypes } = require('sequelize');

class Equipe extends Model {
    
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            dt_ativacao: DataTypes.DATEONLY,
            dt_desativacao: DataTypes.DATEONLY,
            sn_ativa: DataTypes.BOOLEAN,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsToMany(models.Pessoa, {foreignKey: 'equipe_id', through: 'equipes_pessoas', as: 'pessoas'});
        this.hasMany(models.Sprint, {foreignKey: 'equipe_id', as: 'sprints'});
        this.hasMany(models.Atividade, {foreignKey: 'equipe_id', as: 'atividades'});
    }

}

module.exports = Equipe;