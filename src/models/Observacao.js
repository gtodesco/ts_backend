const { Model, DataTypes } = require('sequelize');

class Observacao extends Model {
    
    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
        }, {
            sequelize
        })
    }

}

module.exports = Observacao;