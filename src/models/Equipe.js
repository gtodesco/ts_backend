const { Model, DataTypes } = require('sequelize');

class Equipe extends Model {
    
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            dt_ativacao: DataTypes.DATEONLY,
            dt_desativacao: DataTypes.DATEONLY,
            sn_ativa: DataTypes.BOOLEAN,
        }, {
            sequelize
        })
    }

}

module.exports = Equipe;