const { sequelize, Sequelize } = require(".");
const { DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    
    const Horse = sequelize.define('Horse', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        race: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Horse;
}
