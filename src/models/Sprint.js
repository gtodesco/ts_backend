const { Model, DataTypes } = require('sequelize');

class Sprint extends Model {
    
    static init(sequelize) {
        super.init({
            numero: DataTypes.INTEGER,
            dt_inicio: DataTypes.DATEONLY,
            dt_fim: DataTypes.DATEONLY,
            sn_ativa: DataTypes.BOOLEAN,
            objetivo: DataTypes.STRING,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Equipe, {foreignKey: 'equipe_id', as: 'equipe'});
        this.hasMany(models.Atividade, {foreignKey: 'sprint_id', as: 'atividades'});
        this.hasMany(models.Impedimento, {foreignKey: 'sprint_id', as: 'impedimentos'});
        this.hasOne(models.Retrospectiva, {foreignKey: 'sprint_id', as: 'retrospectiva'});
    }

}

module.exports = Sprint;