const { sequelize, Sequelize } = require(".");
const { DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    
    const Course = sequelize.define('Course', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        courseDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        maxUser: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        galop: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return Course;
}
