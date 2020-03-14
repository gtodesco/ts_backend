const { Model, DataTypes } = require('sequelize');

class Impedimento extends Model {
    
    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
            horas: DataTypes.DATE,
        }, {
            sequelize
        })
    }

}

module.exports = Impedimento;