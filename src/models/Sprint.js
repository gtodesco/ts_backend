const { Model, DataTypes } = require('sequelize');

class Sprint extends Model {
    
    static init(sequelize) {
        super.init({
            numero: DataTypes.INTEGER,
            dt_inicio: DataTypes.DATEONLY,
            dt_fim: DataTypes.DATEONLY,
            sn_ativa: DataTypes.BOOLEAN,
        }, {
            sequelize
        })
    }

}

module.exports = Sprint;