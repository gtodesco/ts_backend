const { Model, DataTypes } = require('sequelize');

class Observacao extends Model {
    
    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'observacoes'
        })
    }

    static associate(models) {
        this.belongsTo(models.Atividade, {foreignKey: 'atividade_id', as: 'atividade'});
    }

}

module.exports = Observacao;