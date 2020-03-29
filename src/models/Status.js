const { Model, DataTypes } = require('sequelize');

class Status extends Model {
    
    static init(sequelize) {
        super.init({
            descricao: DataTypes.STRING,
        }, {
            sequelize,
            tableName: 'status'
        })
    }

    static associate(models) {
        this.hasMany(models.Atividade, {foreignKey: 'status_id', as: 'atividades'});
    }

}

module.exports = Status;