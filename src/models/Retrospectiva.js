const { Model, DataTypes } = require('sequelize');

class Retrospectiva extends Model {
    
    static init(sequelize) {
        super.init({
            start: DataTypes.STRING,
            stop: DataTypes.STRING,
            continuar: DataTypes.STRING,
        }, {
            sequelize
        })
    }

}

module.exports = Retrospectiva;