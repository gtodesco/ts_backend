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

    static associate(models) {
        this.belongsTo(models.Sprint, {foreignKey: 'sprint_id', as: 'sprint'});
    }

}

module.exports = Retrospectiva;