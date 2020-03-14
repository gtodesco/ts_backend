const { Model, DataTypes } = require('sequelize');

class Pessoa extends Model {
    
    static init(sequelize) {
        super.init({
            nome: DataTypes.STRING,
            email: DataTypes.STRING,
            dt_nascimento: DataTypes.DATEONLY,
            sn_scrummaster: DataTypes.BOOLEAN,
            sn_empresa: DataTypes.BOOLEAN,
            login: DataTypes.STRING,
            senha: DataTypes.STRING
        }, {
            sequelize
        })
    }

}

module.exports = Pessoa;