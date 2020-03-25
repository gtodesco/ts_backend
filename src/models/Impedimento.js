const { Model, DataTypes } = require('sequelize');

class Impedimento extends Model {
    
    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
            horas: DataTypes.TIME,
        }, {
            sequelize
        })
    }

    static associate(models) {
        this.belongsTo(models.Pessoa, {foreignKey: 'pessoa_id', as: 'pessoa'});
        this.belongsTo(models.Sprint, {foreignKey: 'sprint_id', as: 'sprint'});
    }

}

module.exports = Impedimento;