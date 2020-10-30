const { sequelize, Sequelize } = require(".");
const { DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    const Role = sequelize.define('Role', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}
