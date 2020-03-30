const { Model, DataTypes } = require('sequelize');

class TipoAtividade extends Model {
    
    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
        }, {
            sequelize,
            tableName: "tipos_atividade"
        })
    }

}

module.exports = TipoAtividade;