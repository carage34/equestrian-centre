const { sequelize, Sequelize } = require(".");
const { DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    
    const UserCourse = sequelize.define('UserCourse', {
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idCourse: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return UserCourse;
}
