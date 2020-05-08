const { Model, DataTypes } = require('sequelize');

class TipoAtividade extends Model {
    
    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
            color: DataTypes.STRING
        }, {
            sequelize,
            tableName: "tipos_atividade"
        })
    }

    static associate(models) {
        this.belongsTo(models.Equipe, {foreignKey: 'equipe_id', as: 'equipe'});
    }

}


module.exports = TipoAtividade;