const { sequelize, Sequelize } = require(".");
const { DataTypes } = require('sequelize');


module.exports = (sequelize, Sequelize) => {
    
    const UserCourseHorse = sequelize.define('UserCourseHorse', {
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idCourse: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        idHorse: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    });
    return UserCourseHorse;
}
