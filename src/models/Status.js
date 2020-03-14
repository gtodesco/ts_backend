const { Model, DataTypes } = require('sequelize');

class Status extends Model {
    
    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
        }, {
            sequelize
        })
    }

}

module.exports = Status;