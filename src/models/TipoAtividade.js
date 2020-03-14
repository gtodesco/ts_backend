const { Model, DataTypes } = require('sequelize');

class TipoAtividade extends Model {
    
    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
        }, {
            sequelize
        })
    }

}

module.exports = TipoAtividade;