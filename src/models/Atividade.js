const { Model, DataTypes } = require('sequelize');

class Atividade extends Model {
    
    static init(sequelize) {
        super.init({
            titulo: DataTypes.STRING,
            descricao: DataTypes.STRING,
            horas_previsto: DataTypes.DATE,
            horas_realizado: DataTypes.DATE,
        }, {
            sequelize
        })
    }

}

module.exports = Atividade;