const { Model, DataTypes } = require('sequelize');

class EquipesPessoas extends Model {
    
    static init(sequelize) {
        super.init({
            equipe_id: DataTypes.INTEGER,
            pessoa_id: DataTypes.INTEGER,
            sn_scrummaster: DataTypes.BOOLEAN,
        }, {
            sequelize
        })
    }

}

module.exports = EquipesPessoas;