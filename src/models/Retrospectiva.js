const { Model, DataTypes } = require('sequelize');

class Retrospectiva extends Model {
    
    static init(sequelize) {
        super.init({
            start: DataTypes.STRING,
            stop: DataTypes.STRING,
            continue: DataTypes.STRING,
        }, {
            sequelize
        })
    }

}

module.exports = Retrospectiva;