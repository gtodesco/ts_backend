const { Model, DataTypes } = require('sequelize');

class Atividade extends Model {
    
    static init(sequelize) {
        super.init({
            titulo: DataTypes.STRING,
            descricao: DataTypes.STRING,
            horas_previsto: DataTypes.TIME,
            horas_realizado: DataTypes.TIME,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Sprint, {foreignKey: 'sprint_id', as: 'sprint'});
        this.belongsTo(models.Equipe, {foreignKey: 'equipe_id', as: 'equipe'});
        this.belongsToMany(models.Pessoa, {foreignKey: 'atividade_id', through: 'pessoas_atividades', as: 'pessoas'});
        this.hasOne(models.Status, {foreignKey: 'status_id', as: 'status'});
        this.hasOne(models.TipoAtividade, {foreignKey: 'tipo_atividade_id', as: 'tipo_atividade'});
        this.hasMany(models.Observacao, {foreignKey: 'atividade_id', as: 'observacoes'});
    }

}

module.exports = Atividade;