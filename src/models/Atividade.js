const { Model, DataTypes } = require('sequelize');

class Atividade extends Model {
    
    static init(sequelize) {
        super.init({
            titulo: DataTypes.STRING,
            descricao: DataTypes.STRING,
            prioridade: DataTypes.INTEGER,
            horas_previsto: DataTypes.TIME,
            horas_realizado: DataTypes.TIME,
            dt_conclusao: DataTypes.DATEONLY,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Sprint, {foreignKey: 'sprint_id', as: 'sprint'});
        this.belongsTo(models.Equipe, {foreignKey: 'equipe_id', as: 'equipe'});
        this.belongsTo(models.Status, {foreignKey: 'status_id', as: 'status'});
        this.belongsTo(models.TipoAtividade, {foreignKey: 'tipo_id', as: 'tipos_atividade'});
        this.belongsToMany(models.Pessoa, {foreignKey: 'atividade_id', through: 'pessoas_atividades', as: 'pessoas'});
        this.hasMany(models.Observacao, {foreignKey: 'atividade_id', as: 'observacoes'});
    }

}

module.exports = Atividade;